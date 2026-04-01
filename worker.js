// Web Worker: uses wasm-bindgen generated module for WASM image processing
import init, * as wasm from '/raster_core.js';

let ready = false;

init('/raster_core_bg.wasm').then(() => {
  ready = true;
  postMessage({ type: 'ready' });
}).catch(err => {
  postMessage({ type: 'error', msg: 'WASM init failed: ' + err.message });
});

onmessage = function(e) {
  if (!ready) { postMessage({ type: 'error', msg: 'WASM not ready' }); return; }
  const { type, id } = e.data;
  if (type === 'process') {
    try {
      const result = processImage(e.data);
      postMessage({ type: 'result', id, data: result }, [result.buffer]);
    } catch (err) {
      postMessage({ type: 'error', id, msg: String(err.message || err) });
    }
  }
};

function processImage(msg) {
  const { imageData, params, cw, ch, oR, oG, oB } = msg;
  const pixelCount = cw * ch;
  const data = new Uint8Array(imageData);

  // ===== FILTERS (mutate data in-place via WASM) =====
  const needGray = !(params.activeMode === 'coloraster' ||
    (params.activeMode === 'pointillist' && params.ptColorMode === 'image'));
  const methodMap = { luminance: 0, average: 1, lightness: 2, red: 3, green: 4, blue: 5 };
  if (params.grayMethod !== 'none' && needGray) {
    wasm.grayscale(data, methodMap[params.grayMethod] || 0);
  }
  if (params.brightness !== 0 || params.contrast !== 0) {
    wasm.brightness_contrast(data, params.brightness, params.contrast);
  }
  if (params.gamma !== 1.0) {
    wasm.gamma_correct(data, params.gamma);
  }
  if (params.sharpenAmount > 0) {
    const dst = new Uint8Array(data.length);
    wasm.sharpen(data, dst, cw, ch, params.sharpenAmount);
    data.set(dst);
  }
  if (params.invert) {
    wasm.invert(data);
  }
  if (params.dgShadow !== 0 || params.dgHighlight !== 0) {
    wasm.dot_gain(data, params.dgShadow, params.dgHighlight);
  }

  // ===== EXTRACT GRAY =====
  const gray = new Float32Array(pixelCount);
  wasm.extract_gray(data, gray);

  // ===== OUTPUT =====
  const out = new Uint8Array(pixelCount * 4);
  const dc = params.dotColor;
  const bc = params.bgColor;
  const tb = params.transparentBg;
  const mode = params.activeMode;

  if (mode === 'dotraster') {
    const ht = params.halftoneType;
    if (ht === 'am') {
      wasm.halftone_am(gray, out, cw, ch,
        params.amLPI, params.amAngle, params.amShape, params.amLayout,
        params.amShiftX, params.amShiftY,
        dc.r, dc.g, dc.b, bc.r, bc.g, bc.b, tb);
    } else if (ht === 'pattern') {
      const cm = params.customMatrix ? new Float32Array(params.customMatrix) : new Float32Array(0);
      wasm.halftone_pattern(gray, out, cw, ch,
        params.patternIdx, params.patOffX, params.patOffY, params.patAngle,
        cm, params.customMatrixSize || 0,
        dc.r, dc.g, dc.b, bc.r, bc.g, bc.b, tb);
    } else if (ht === 'errordiff') {
      const algoMap = { floyd:0, falsefs:1, jjn:2, stucki:3, burkes:4, sierra:5, sierra2:6, sierralite:7, atkinson:8, fan:9 };
      wasm.error_diffusion(gray, out, cw, ch,
        algoMap[params.errorAlgo] || 0, params.errorStrength,
        dc.r, dc.g, dc.b, bc.r, bc.g, bc.b, tb);
    } else if (ht === 'ordered') {
      wasm.ordered_dither(gray, out, cw, ch,
        params.orderedSize, params.orderedLevels,
        dc.r, dc.g, dc.b, bc.r, bc.g, bc.b, tb);
    } else if (ht === 'noise') {
      const noiseMap = { random:0, gaussian:1, simplex:2, worley:3 };
      const dotsMap = { black:0, white:1, blend:2 };
      wasm.noise_dither(gray, out, cw, ch,
        noiseMap[params.noiseType] || 0, params.noiseStdDev, params.noiseSize,
        dotsMap[params.noiseDots] || 0,
        dc.r, dc.g, dc.b, bc.r, bc.g, bc.b, tb);
    } else if (ht === 'threshold') {
      wasm.threshold(gray, out, cw, ch, params.thresholdVal,
        dc.r, dc.g, dc.b, bc.r, bc.g, bc.b, tb);
    }

  } else if (mode === 'stochaster') {
    const cellSize = Math.max(3, Math.round(Math.min(cw, ch) / params.stochLPI));
    let patTex;
    if (params.stochType === 'serpentine') {
      const iterations = params.rdGrow * 150;
      patTex = wasm.reaction_diffusion(cellSize, cellSize, params.rdU, params.rdV, params.rdF, params.rdK, iterations);
    } else {
      patTex = genSpiral_JS(cellSize, params);
    }
    const layers = new Uint8Array(params.layers);
    wasm.stochaster_composite(gray, patTex, out, cw, ch, cellSize,
      params.stochAngle, params.stochDotArea, params.stochTint, params.stochInvert,
      layers, dc.r, dc.g, dc.b, bc.r, bc.g, bc.b, tb);

  } else if (mode === 'pointillist') {
    processPointillist_JS(gray, out, cw, ch, params, new Uint8Array(oR), new Uint8Array(oG), new Uint8Array(oB));

  } else if (mode === 'coloraster') {
    const orA = new Uint8Array(oR), ogA = new Uint8Array(oG), obA = new Uint8Array(oB);
    const modeMap = { grayscale:0, duotone:1, tritone:2, 'rgb-split':3, 'cmyk-split':4, posterize:5, 'hue-shift':6, colorize:7 };
    wasm.coloraster(out, cw, ch, orA, ogA, obA,
      modeMap[params.clrMode] || 0,
      params.clrC1.r, params.clrC1.g, params.clrC1.b,
      params.clrC2.r, params.clrC2.g, params.clrC2.b,
      params.clrC3.r, params.clrC3.g, params.clrC3.b,
      params.clrParam1, params.clrParam2, params.clrParam3);
  }

  return out;
}

// ===== JS fallbacks for complex algorithms =====

function genSpiral_JS(cellSize, p) {
  const w = cellSize, h = cellSize;
  const res = new Float32Array(w * h).fill(1);
  const numSpirals = Math.max(1, Math.floor(w * h / (p.spiralSpacing * p.spiralSpacing)));
  const thick = p.spiralContour === 'absolute' ? 4 : 3;
  for (let s = 0; s < numSpirals; s++) {
    const scx = Math.random() * w, scy = Math.random() * h;
    const dirMul = p.spiralDir === 'ccw' ? -1 : p.spiralDir === 'random' ? (Math.random() < 0.5 ? 1 : -1) : 1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const dx = x - scx, dy = y - scy, dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > p.spiralRadius) continue;
      const angle = Math.atan2(dy, dx) * dirMul;
      for (let a = 0; a < p.spiralArms; a++) {
        const armA = angle + a * 2 * Math.PI / p.spiralArms;
        const spiralD = ((armA / (2 * Math.PI) * p.spiralWrap + dist / (w * 0.3)) % 1);
        const t = p.spiralContour === 'relative' ? thick * (1 - dist / p.spiralRadius * 0.5) : thick;
        if (Math.abs(spiralD - 0.5) < t / (w * 0.5))
          res[y * w + x] = Math.min(res[y * w + x], dist / (p.spiralRadius * 0.8));
      }
    }
  }
  return res;
}

function processPointillist_JS(gray, out, w, h, p, oR, oG, oB) {
  const ptDc = p.ptDotColor, ptBc = p.ptBGColor;
  const alpha = p.ptAlpha;

  for (let i = 0; i < w * h; i++) {
    const x = i * 4;
    out[x] = ptBc.r; out[x+1] = ptBc.g; out[x+2] = ptBc.b; out[x+3] = 255;
  }

  const { ptSize: sizeVal, ptSizeRange: sizeRange, ptSizeMin: sizeMin,
    ptSpaceMin: spaceMin, ptSpaceMax: spaceMax, ptPhases: phases,
    ptOverpaint: overpaint, ptHideZone: hideZone, ptHideMin: hideMin,
    ptAA: aa, ptAngle: angleVal, ptAngleRandom: angleRandom } = p;

  const allPoints = [];
  for (let phase = 0; phase < phases; phase++) {
    const phaseMin = phase / phases, phaseMax = (phase + 1) / phases;
    const spacing = spaceMin + (spaceMax - spaceMin) * phase / phases;
    const step = Math.max(1, Math.round(spacing));
    for (let py = 0; py < h; py += step) for (let px = 0; px < w; px += step) {
      const jx = px + (Math.random() - 0.5) * step * 0.5;
      const jy = py + (Math.random() - 0.5) * step * 0.5;
      const ix = Math.min(w - 1, Math.max(0, jx | 0));
      const iy = Math.min(h - 1, Math.max(0, jy | 0));
      const brightness = gray[iy * w + ix], darkness = 1 - brightness;
      if (hideZone && brightness > hideMin) continue;
      if (darkness < phaseMin || darkness >= phaseMax) continue;
      allPoints.push([jx, jy, darkness, ix, iy]);
    }
  }

  allPoints.sort((a, b) => overpaint ? a[2] - b[2] : b[2] - a[2]);

  for (const [px, py, darkness, ix, iy] of allPoints) {
    const sz = sizeRange ? sizeMin + (sizeVal - sizeMin) * darkness : sizeVal * Math.max(0.3, darkness);
    if (sz < 0.5) continue;

    let cr, cg, cb;
    switch (p.ptColorMode) {
      case 'solid': cr = ptDc.r; cg = ptDc.g; cb = ptDc.b; break;
      case 'adaptive': { const v = 255 * (1 - darkness); cr = ptDc.r * (1-darkness) + v * darkness; cg = ptDc.g * (1-darkness) + v * darkness; cb = ptDc.b * (1-darkness) + v * darkness; break; }
      case 'image': cr = oR[iy * w + ix]; cg = oG[iy * w + ix]; cb = oB[iy * w + ix]; break;
      case 'multi': cr = Math.random() * 255; cg = Math.random() * 255; cb = Math.random() * 255; break;
      default: cr = ptDc.r; cg = ptDc.g; cb = ptDc.b;
    }

    let ptA = angleRandom ? Math.random() * Math.PI * 2 : angleVal;
    const rad = Math.ceil(sz);

    for (let dy = -rad; dy <= rad; dy++) for (let dx = -rad; dx <= rad; dx++) {
      const sx = (px | 0) + dx, sy = (py | 0) + dy;
      if (sx < 0 || sx >= w || sy < 0 || sy >= h) continue;
      let inside = false;
      if (p.ptShape === 'circle') {
        inside = dx * dx + dy * dy <= sz * sz;
      } else if (p.ptShape === 'polygon') {
        const a = Math.atan2(dy, dx) + ptA, d = Math.sqrt(dx*dx + dy*dy);
        const st = Math.PI * 2 / p.ptVertices;
        const pR = sz * Math.cos(Math.PI / p.ptVertices) / Math.cos(((a % st) + st) % st - Math.PI / p.ptVertices);
        inside = d <= pR * (1 + (Math.random() - 0.5) * p.ptWarp);
      } else if (p.ptShape === 'line') {
        if (p.ptLineStyle === 'radial') {
          const d = Math.sqrt(dx*dx + dy*dy), a = Math.atan2(dy, dx);
          const segA = Math.round(a / (Math.PI * 2 / p.ptSegments)) * (Math.PI * 2 / p.ptSegments);
          inside = d <= p.ptLength && Math.abs(a - segA) < 0.15;
        } else {
          const rdx = dx * Math.cos(ptA) + dy * Math.sin(ptA);
          const rdy = -dx * Math.sin(ptA) + dy * Math.cos(ptA);
          inside = Math.abs(rdy) <= 1.5 && Math.abs(rdx) <= p.ptLength;
        }
      }
      if (inside) {
        const oi = (sy * w + sx) * 4, a2 = alpha / 255;
        if (aa) {
          out[oi] = (out[oi] * (1 - a2) + cr * a2) | 0;
          out[oi+1] = (out[oi+1] * (1 - a2) + cg * a2) | 0;
          out[oi+2] = (out[oi+2] * (1 - a2) + cb * a2) | 0;
        } else {
          out[oi] = cr | 0; out[oi+1] = cg | 0; out[oi+2] = cb | 0;
        }
        out[oi+3] = 255;
      }
    }
  }
}
