/* @ts-self-types="./raster_core.d.ts" */

/**
 * @param {Uint8Array} data
 * @param {number} bright
 * @param {number} contrast
 */
export function brightness_contrast(data, bright, contrast) {
    var ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.brightness_contrast(ptr0, len0, data, bright, contrast);
}

/**
 * @param {Uint8Array} out
 * @param {number} w
 * @param {number} h
 * @param {Uint8Array} or
 * @param {Uint8Array} og
 * @param {Uint8Array} ob
 * @param {number} mode
 * @param {number} c1_r
 * @param {number} c1_g
 * @param {number} c1_b
 * @param {number} c2_r
 * @param {number} c2_g
 * @param {number} c2_b
 * @param {number} c3_r
 * @param {number} c3_g
 * @param {number} c3_b
 * @param {number} param1
 * @param {number} param2
 * @param {number} param3
 */
export function coloraster(out, w, h, or, og, ob, mode, c1_r, c1_g, c1_b, c2_r, c2_g, c2_b, c3_r, c3_g, c3_b, param1, param2, param3) {
    var ptr0 = passArray8ToWasm0(out, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm0(or, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArray8ToWasm0(og, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passArray8ToWasm0(ob, wasm.__wbindgen_malloc);
    const len3 = WASM_VECTOR_LEN;
    wasm.coloraster(ptr0, len0, out, w, h, ptr1, len1, ptr2, len2, ptr3, len3, mode, c1_r, c1_g, c1_b, c2_r, c2_g, c2_b, c3_r, c3_g, c3_b, param1, param2, param3);
}

/**
 * @param {Uint8Array} data
 * @param {number} shadow
 * @param {number} highlight
 */
export function dot_gain(data, shadow, highlight) {
    var ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.dot_gain(ptr0, len0, data, shadow, highlight);
}

/**
 * @param {Float32Array} gray
 * @param {Uint8Array} out
 * @param {number} w
 * @param {number} h
 * @param {number} algo
 * @param {number} strength
 * @param {number} dc_r
 * @param {number} dc_g
 * @param {number} dc_b
 * @param {number} bc_r
 * @param {number} bc_g
 * @param {number} bc_b
 * @param {boolean} transparent
 */
export function error_diffusion(gray, out, w, h, algo, strength, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent) {
    const ptr0 = passArrayF32ToWasm0(gray, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(out, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.error_diffusion(ptr0, len0, ptr1, len1, out, w, h, algo, strength, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent);
}

/**
 * @param {Uint8Array} data
 * @param {Float32Array} gray
 */
export function extract_gray(data, gray) {
    const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = passArrayF32ToWasm0(gray, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.extract_gray(ptr0, len0, ptr1, len1, gray);
}

/**
 * @param {Uint8Array} data
 * @param {number} gamma
 */
export function gamma_correct(data, gamma) {
    var ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.gamma_correct(ptr0, len0, data, gamma);
}

/**
 * @param {Uint8Array} data
 * @param {number} method
 */
export function grayscale(data, method) {
    var ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.grayscale(ptr0, len0, data, method);
}

/**
 * @param {Float32Array} gray
 * @param {Uint8Array} out
 * @param {number} w
 * @param {number} h
 * @param {number} lpi
 * @param {number} angle_deg
 * @param {number} shape
 * @param {number} layout
 * @param {number} shift_x
 * @param {number} shift_y
 * @param {number} dc_r
 * @param {number} dc_g
 * @param {number} dc_b
 * @param {number} bc_r
 * @param {number} bc_g
 * @param {number} bc_b
 * @param {boolean} transparent
 */
export function halftone_am(gray, out, w, h, lpi, angle_deg, shape, layout, shift_x, shift_y, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent) {
    const ptr0 = passArrayF32ToWasm0(gray, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(out, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.halftone_am(ptr0, len0, ptr1, len1, out, w, h, lpi, angle_deg, shape, layout, shift_x, shift_y, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent);
}

/**
 * @param {Float32Array} gray
 * @param {Uint8Array} out
 * @param {number} w
 * @param {number} h
 * @param {number} pattern_idx
 * @param {number} off_x
 * @param {number} off_y
 * @param {number} pat_angle_deg
 * @param {Float32Array} custom_matrix
 * @param {number} custom_size
 * @param {number} dc_r
 * @param {number} dc_g
 * @param {number} dc_b
 * @param {number} bc_r
 * @param {number} bc_g
 * @param {number} bc_b
 * @param {boolean} transparent
 */
export function halftone_pattern(gray, out, w, h, pattern_idx, off_x, off_y, pat_angle_deg, custom_matrix, custom_size, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent) {
    const ptr0 = passArrayF32ToWasm0(gray, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(out, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    const ptr2 = passArrayF32ToWasm0(custom_matrix, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    wasm.halftone_pattern(ptr0, len0, ptr1, len1, out, w, h, pattern_idx, off_x, off_y, pat_angle_deg, ptr2, len2, custom_size, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent);
}

/**
 * @param {Uint8Array} data
 */
export function invert(data) {
    var ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.invert(ptr0, len0, data);
}

/**
 * @param {Float32Array} gray
 * @param {number} w
 * @param {number} h
 * @param {number} azimuth_deg
 * @param {number} elevation_deg
 * @param {number} intensity
 * @param {number} ambient
 * @param {number} bump_strength
 * @param {number} specular_on
 * @param {number} shininess
 */
export function light_direction(gray, w, h, azimuth_deg, elevation_deg, intensity, ambient, bump_strength, specular_on, shininess) {
    var ptr0 = passArrayF32ToWasm0(gray, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.light_direction(ptr0, len0, gray, w, h, azimuth_deg, elevation_deg, intensity, ambient, bump_strength, specular_on, shininess);
}

/**
 * @param {Float32Array} gray
 * @param {Uint8Array} out
 * @param {number} w
 * @param {number} h
 * @param {number} noise_type
 * @param {number} std_dev
 * @param {number} noise_size
 * @param {number} dots_mode
 * @param {number} dc_r
 * @param {number} dc_g
 * @param {number} dc_b
 * @param {number} bc_r
 * @param {number} bc_g
 * @param {number} bc_b
 * @param {boolean} transparent
 */
export function noise_dither(gray, out, w, h, noise_type, std_dev, noise_size, dots_mode, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent) {
    const ptr0 = passArrayF32ToWasm0(gray, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(out, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.noise_dither(ptr0, len0, ptr1, len1, out, w, h, noise_type, std_dev, noise_size, dots_mode, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent);
}

/**
 * @param {Float32Array} gray
 * @param {Uint8Array} out
 * @param {number} w
 * @param {number} h
 * @param {number} matrix_size
 * @param {number} levels
 * @param {number} dc_r
 * @param {number} dc_g
 * @param {number} dc_b
 * @param {number} bc_r
 * @param {number} bc_g
 * @param {number} bc_b
 * @param {boolean} transparent
 */
export function ordered_dither(gray, out, w, h, matrix_size, levels, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent) {
    const ptr0 = passArrayF32ToWasm0(gray, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(out, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.ordered_dither(ptr0, len0, ptr1, len1, out, w, h, matrix_size, levels, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent);
}

/**
 * @param {number} w
 * @param {number} h
 * @param {number} u_diff
 * @param {number} v_diff
 * @param {number} feed
 * @param {number} kill
 * @param {number} iterations
 * @returns {Float32Array}
 */
export function reaction_diffusion(w, h, u_diff, v_diff, feed, kill, iterations) {
    const ret = wasm.reaction_diffusion(w, h, u_diff, v_diff, feed, kill, iterations);
    var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
}

/**
 * @param {Uint8Array} src
 * @param {Uint8Array} dst
 * @param {number} w
 * @param {number} h
 * @param {number} amount
 */
export function sharpen(src, dst, w, h, amount) {
    const ptr0 = passArray8ToWasm0(src, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(dst, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.sharpen(ptr0, len0, ptr1, len1, dst, w, h, amount);
}

/**
 * @param {Float32Array} gray
 * @param {Float32Array} pat_tex
 * @param {Uint8Array} out
 * @param {number} w
 * @param {number} h
 * @param {number} cell_size
 * @param {number} angle_deg
 * @param {number} dot_area
 * @param {number} tint
 * @param {boolean} do_invert
 * @param {Uint8Array} layers
 * @param {number} dc_r
 * @param {number} dc_g
 * @param {number} dc_b
 * @param {number} bc_r
 * @param {number} bc_g
 * @param {number} bc_b
 * @param {boolean} transparent
 */
export function stochaster_composite(gray, pat_tex, out, w, h, cell_size, angle_deg, dot_area, tint, do_invert, layers, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent) {
    const ptr0 = passArrayF32ToWasm0(gray, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayF32ToWasm0(pat_tex, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    var ptr2 = passArray8ToWasm0(out, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    const ptr3 = passArray8ToWasm0(layers, wasm.__wbindgen_malloc);
    const len3 = WASM_VECTOR_LEN;
    wasm.stochaster_composite(ptr0, len0, ptr1, len1, ptr2, len2, out, w, h, cell_size, angle_deg, dot_area, tint, do_invert, ptr3, len3, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent);
}

/**
 * @param {Float32Array} gray
 * @param {Uint8Array} out
 * @param {number} w
 * @param {number} h
 * @param {number} thresh
 * @param {number} dc_r
 * @param {number} dc_g
 * @param {number} dc_b
 * @param {number} bc_r
 * @param {number} bc_g
 * @param {number} bc_b
 * @param {boolean} transparent
 */
export function threshold(gray, out, w, h, thresh, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent) {
    const ptr0 = passArrayF32ToWasm0(gray, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(out, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.threshold(ptr0, len0, ptr1, len1, out, w, h, thresh, dc_r, dc_g, dc_b, bc_r, bc_g, bc_b, transparent);
}

function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_copy_to_typed_array_a4db337751e0b328: function(arg0, arg1, arg2) {
            new Uint8Array(arg2.buffer, arg2.byteOffset, arg2.byteLength).set(getArrayU8FromWasm0(arg0, arg1));
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./raster_core_bg.js": import0,
    };
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedFloat32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('raster_core_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
