(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14,8,10,11],{

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/PeerClient.vue?vue&type=template&id=210bdf8c&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c,
      _setup = _vm._self._setupProxy;

  return _c('div', [_vm.qrcodeImage ? _c('img', {
    attrs: {
      "src": _vm.qrcodeImage,
      "alt": "QR Code"
    }
  }) : _vm._e()]);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/PeerClient.vue?vue&type=template&id=210bdf8c&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/qrcode/lib/browser.js
var browser = __webpack_require__(268);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// EXTERNAL MODULE: ./node_modules/peerjs/dist/bundler.mjs
var bundler = __webpack_require__(258);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/PeerClient.vue?vue&type=script&lang=js&




/* harmony default export */ var PeerClientvue_type_script_lang_js_ = (vue_runtime_esm["a" /* default */].extend({
  props: {
    settings: {
      type: Object,
      required: true
    },
    optionsSetter: {
      type: Function,
      required: true
    }
  },
  data: function data() {
    return {
      peer: null,
      peerID: 'Connecting...',
      key: '',
      qrcodeImage: '',
      connection: null
    };
  },
  watch: {
    peerID: function peerID(message) {
      this.$emit('message', message);
    }
  },
  methods: {
    initPeer: function initPeer() {
      var _this = this;

      this.generateQrCode("https://".concat(location.hostname).concat(this.$route.fullPath, "/sender?k=").concat(this.key));
      this.peer.on('open', function () {
        _this.peerID = "".concat(_this.peer.id);

        _this.peer.on('connection', function (connection) {
          _this.connection = connection;
          connection.on('open', function () {
            _this.sendMessage({
              settings: _this.settings
            });
          });
          connection.on('data', function (data) {
            if ('settings' in data) {
              _this.optionsSetter(data.settings);
            }
          });
        });

        _this.peer.on('close', function () {
          console.log('closed');
        });
      });
    },
    sendMessage: function sendMessage() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.connection) {
        this.connection.send(data);
      }
    },
    generateQrCode: function generateQrCode(text) {
      var _this2 = this;

      browser_default.a.toDataURL(text).then(function (image) {
        return _this2.qrcodeImage = image;
      });
    }
  },
  mounted: function mounted() {
    var key = this.$getKey();
    this.key = key;
    this.peer = new bundler["a" /* default */](key, {
      host: location.hostname,
      path: '/myapp',
      port:  true ? 443 : undefined,
      // using port 443 on prod because the nginx proxy redirects wss the traffic
      secure: "production" === 'production',
      debug: 3,
      config: {
        iceServers: [{
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject"
        }, {
          urls: "turn:openrelay.metered.ca:443",
          username: "openrelayproject",
          credential: "openrelayproject"
        }]
      }
    });
    this.initPeer();
  }
}));
// CONCATENATED MODULE: ./components/PeerClient.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PeerClientvue_type_script_lang_js_ = (PeerClientvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(48);

// CONCATENATED MODULE: ./components/PeerClient.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_PeerClientvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PeerClient = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return textures; });
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var colormap_colorScale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(133);
/* harmony import */ var colormap_colorScale__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(colormap_colorScale__WEBPACK_IMPORTED_MODULE_1__);


var colors = Object.keys(colormap_colorScale__WEBPACK_IMPORTED_MODULE_1___default.a);
var shades = 40;
var textures = ['mercury', 'venus', 'earth', 'moon', 'mars'];
var defaults = {
  globeDiameter: {
    min: 1,
    max: 170,
    step: 1,
    default: 1
  },
  ringsCount: {
    min: 0,
    max: 4,
    step: 1,
    default: 1
  },
  ringsDiameter: {
    min: 1,
    max: 20,
    step: 0.1,
    default: 1
  },
  ringsDistance: {
    min: 0,
    max: 1,
    step: 0.01,
    default: 1
  },
  ringsTilt: {
    min: 0,
    max: 1,
    step: 0.01,
    default: 1
  },
  pixelation: {
    min: 0.2,
    max: 1.5,
    step: 0.1,
    default: 1
  },
  rotationSpeed: {
    min: 1,
    max: 15,
    step: 0.1,
    default: 2
  },
  colorName: {
    min: 0,
    max: colors.length - 1,
    step: 1,
    default: 0
  },
  colorPadding: {
    min: 0,
    max: shades - shades % 2 - 1,
    step: 1,
    default: 0
  },
  contrast: {
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.35
  },
  globeTexture: {
    min: 0,
    max: textures.length - 1,
    step: 1,
    default: 1
  },
  modelType: {
    min: 0,
    max: 2,
    step: 1,
    default: 1
  }
};


/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(106);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Receiver.vue?vue&type=template&id=e50e49ac&


var render = function render() {
  var _vm = this,
      _c = _vm._self._c,
      _setup = _vm._self._setupProxy;

  return _c('div', [_c('main', [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, [_c('p', {
    staticClass: "statusMessage"
  }, [_vm._v("\n                " + _vm._s(_vm.peerID ? _vm.peerID : 'Not connected.') + "\n                "), _vm.peerID ? _c('a', {
    attrs: {
      "href": "".concat(_vm.$route.fullPath, "/sender?k=").concat(_vm.peerID),
      "target": "_new"
    }
  }, [_vm._v("\n                    🕹\n                ")]) : _vm._e()]), _vm._v(" "), _c('PeerClient', {
    attrs: {
      "settings": _vm.settings,
      "options-setter": _vm.SET_OPTIONS
    },
    on: {
      "message": _vm.setMessage
    }
  })], 1)]);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/Receiver.vue?vue&type=template&id=e50e49ac&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(49);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(63);

// EXTERNAL MODULE: ./components/PeerClient.vue + 4 modules
var PeerClient = __webpack_require__(256);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Receiver.vue?vue&type=script&lang=js&









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }




/* harmony default export */ var Receivervue_type_script_lang_js_ = (vue_runtime_esm["a" /* default */].extend({
  components: {
    PeerClient: PeerClient["default"]
  },
  data: function data() {
    return {
      peerID: ''
    };
  },
  computed: _objectSpread({}, Object(vuex_esm["d" /* mapState */])(['settings'])),
  methods: _objectSpread(_objectSpread({}, Object(vuex_esm["b" /* mapActions */])(['SET_OPTIONS'])), {}, {
    setMessage: function setMessage(message) {
      this.peerID = message;
    }
  })
}));
// CONCATENATED MODULE: ./components/Receiver.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Receivervue_type_script_lang_js_ = (Receivervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(48);

// CONCATENATED MODULE: ./components/Receiver.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Receivervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Receiver = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {PeerClient: __webpack_require__(256).default})


/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bg.e4d8065.jpg";

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bg.jpg": 265,
	"./bg1.jpg": 274,
	"./earth-bw.jpg": 275,
	"./earth.jpg": 276,
	"./mars.jpg": 277,
	"./mercury.jpg": 278,
	"./moon.jpg": 279,
	"./venus.jpg": 280
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 273;

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bg1.fb92c20.jpg";

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/earth-bw.de08296.jpg";

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/earth.f3d3516.jpg";

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/mars.fd8afeb.jpg";

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/mercury.3810bca.jpg";

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/moon.d526aa7.jpg";

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/venus.840e54b.jpg";

/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/2d2.689fa15.png";

/***/ }),

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/2d-donut.33c32de.png";

/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(383);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(108).default
var update = add("15c6c6fb", content, true, {"sourceMap":false});

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/remote-sky/Renderer.vue?vue&type=template&id=14830597&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c,
      _setup = _vm._self._setupProxy;

  return _c('div', [_c('canvas', {
    ref: "canvasDump",
    attrs: {
      "id": "canvasDump"
    }
  }), _vm._v(" "), _c('main')]);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/remote-sky/Renderer.vue?vue&type=template&id=14830597&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(49);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array-buffer.slice.js
var es_array_buffer_slice = __webpack_require__(290);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.float32-array.js
var es_typed_array_float32_array = __webpack_require__(294);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.copy-within.js
var es_typed_array_copy_within = __webpack_require__(296);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.every.js
var es_typed_array_every = __webpack_require__(297);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.fill.js
var es_typed_array_fill = __webpack_require__(298);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.filter.js
var es_typed_array_filter = __webpack_require__(299);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.find.js
var es_typed_array_find = __webpack_require__(300);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.find-index.js
var es_typed_array_find_index = __webpack_require__(301);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.for-each.js
var es_typed_array_for_each = __webpack_require__(302);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.includes.js
var es_typed_array_includes = __webpack_require__(303);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.index-of.js
var es_typed_array_index_of = __webpack_require__(304);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.iterator.js
var es_typed_array_iterator = __webpack_require__(305);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.join.js
var es_typed_array_join = __webpack_require__(306);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.last-index-of.js
var es_typed_array_last_index_of = __webpack_require__(307);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.map.js
var es_typed_array_map = __webpack_require__(308);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reduce.js
var es_typed_array_reduce = __webpack_require__(309);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reduce-right.js
var es_typed_array_reduce_right = __webpack_require__(311);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reverse.js
var es_typed_array_reverse = __webpack_require__(312);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.set.js
var es_typed_array_set = __webpack_require__(313);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.slice.js
var es_typed_array_slice = __webpack_require__(314);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.some.js
var es_typed_array_some = __webpack_require__(315);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.sort.js
var es_typed_array_sort = __webpack_require__(316);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.subarray.js
var es_typed_array_subarray = __webpack_require__(317);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.to-locale-string.js
var es_typed_array_to_locale_string = __webpack_require__(318);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.to-string.js
var es_typed_array_to_string = __webpack_require__(319);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.fill.js
var es_array_fill = __webpack_require__(320);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/p5/lib/p5.min.js
var p5_min = __webpack_require__(321);
var p5_min_default = /*#__PURE__*/__webpack_require__.n(p5_min);

// CONCATENATED MODULE: ./assets/remote-sky/threshold.vert
/* harmony default export */ var threshold = ("// our vertex data\nattribute vec3 aPosition;\nattribute vec2 aTexCoord;\n\n// lets get texcoords just for fun! \nvarying vec2 vTexCoord;\n\nvoid main() {\n  // copy the texcoords\n  vTexCoord = aTexCoord;\n\n  // copy the position data into a vec4, using 1.0 as the w component\n  vec4 positionVec4 = vec4(aPosition, 1.0);\n  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;\n\n  // send the vertex information on to the fragment shader\n  gl_Position = positionVec4;\n}");
// CONCATENATED MODULE: ./assets/remote-sky/threshold.frag
/* harmony default export */ var remote_sky_threshold = ("precision mediump float;\n\n// grab texcoords from the vertex shader\nvarying vec2 vTexCoord;\n\n// our texture coming from p5\nuniform sampler2D tex0;\nuniform float thresholdValue;\nuniform vec3 color1;\nuniform vec3 color2;\nuniform vec3 color3;\nuniform float monotone;\n// unused, for passing in-between color. \n// uniform float useColor3;\nfloat useColor3 = 0.0; // default value to interpolate third color.\n\n// this is a common glsl function of unknown origin to convert rgb colors to luminance\n// it performs a dot product of the input color against some known values that account for our eyes perception of brighness\n// i pulled this one from here https://github.com/hughsk/glsl-luma/blob/master/index.glsl\nfloat luma(vec3 color) {\n  return dot(color, vec3(0.299, 0.587, 0.114));\n}\n\nvoid main() {\n\n  vec2 uv = vTexCoord;\n  // the texture is loaded upside down and backwards by default so lets flip it\n  uv = 1.0 - uv;\n\n  // get the texture as a vec4 using texture2D\n  vec4 tex = texture2D(tex0, uv);\n\n  float fullcolor = 1.0;\n  float nocolor = 0.0;\n  float alpha = fullcolor;\n  // if the current pixel is 100% red, the alpha channel is set to 100%\n  if(tex.r == fullcolor && tex.g == nocolor && tex.b == nocolor) {\n    alpha = nocolor;\n  }\n  // convert the texture to grayscale by using the luma function  \n  float gray = luma(tex.rgb);\n\n  float thresh = smoothstep(thresholdValue, 1.0 - thresholdValue, gray);\n\n  // output the threshold value in all three rgb color channels\n\n  vec3 color3computed;\n  if (useColor3 < 0.5) {\n    color3computed = mix(color1, color2, 0.5);\n  } else {\n    color3computed = color3;\n  }\n  \n  if(thresh == fullcolor) {\n    gl_FragColor = vec4(color1, alpha);\n  } else if(thresh > 0.33) {\n    gl_FragColor = vec4(color3computed, alpha);\n  } else {\n    gl_FragColor = vec4(color2, alpha);\n  }\n}");
// EXTERNAL MODULE: ./node_modules/gifshot/dist/gifshot.js
var gifshot = __webpack_require__(322);
var gifshot_default = /*#__PURE__*/__webpack_require__.n(gifshot);

// EXTERNAL MODULE: ./node_modules/colormap/index.js
var colormap = __webpack_require__(323);
var colormap_default = /*#__PURE__*/__webpack_require__.n(colormap);

// EXTERNAL MODULE: ./node_modules/colormap/colorScale.js
var colorScale = __webpack_require__(133);
var colorScale_default = /*#__PURE__*/__webpack_require__.n(colorScale);

// EXTERNAL MODULE: ./assets/remote-sky/defaults.ts
var defaults = __webpack_require__(262);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/remote-sky/Renderer.vue?vue&type=script&lang=js&






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }









































var back = null;
var front = null;
var modelTypes = ['box', 'sphere', 'torus'];
/* harmony default export */ var Renderervue_type_script_lang_js_ = (vue_runtime_esm["a" /* default */].extend({
  data: function data() {
    return {
      backLayer: null,
      frontLayer: null,
      mediaRecorder: null,
      skyColors: ['#00000f', '#8a6da2', '#f8eeff'],
      colors: Object.keys(colorScale_default.a),
      shades: 40,
      color1: '#000000',
      color2: '#000000',
      color3: '#000000'
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex_esm["d" /* mapState */])(['settings', 'stopMultiplicator', 'isRecording', 'isRecordingNow', 'gifData'])), {}, {
    sizeRatio: function sizeRatio() {
      return document.querySelector('main canvas').offsetWidth / 800;
    },
    pixelDensity: function pixelDensity() {
      return (1.7 - this.settings.pixelation) * (0.5 / window.devicePixelRatio * this.sizeRatio);
    },
    maxDimension: function maxDimension() {
      return Math.max(window.innerWidth, window.innerHeight);
    }
  }),
  watch: {
    'settings.colorName': function settingsColorName(value) {
      this.getColorMap(value);
    },
    'settings.colorPadding': function settingsColorPadding() {
      this.getColorMap(this.settings.colorName);
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex_esm["c" /* mapMutations */])(['SET_IS_RECORDING', 'SET_IS_RECORDING_NOW', 'SET_CURRENT_RECORD_STATUS', 'SET_STOP_MULTIPLICATOR', 'SET_GIF_DATA', 'SET_DL_READY', 'SET_DL_GIF', 'SET_DL_NAME', 'PUSH_GIF_DATA'])), {}, {
    getColorMap: function getColorMap(colorMapIndex) {
      var colors = colormap_default()({
        colormap: this.colors[colorMapIndex],
        nshades: this.shades,
        format: 'hex',
        alpha: 1
      });
      this.color1 = colors[this.settings.colorPadding];
      this.color2 = colors[(colors.length - colors.length % 2) / 2];
      this.color3 = colors[colors.length - 1 - this.settings.colorPadding];
    },
    hexToRgb: function hexToRgb(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? new Float32Array([parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]) : null;
    },
    getImageData: function getImageData(canvas1, canvas2, width, height) {
      var c = this.$refs.canvasDump;
      c.width = width;
      c.height = height;
      var context = c.getContext('2d');
      context.imageSmoothingEnabled = false;
      context.drawImage(canvas1, 0, 0, canvas1.width, canvas1.height, 0, 0, width, height);
      context.drawImage(canvas2, 0, 0, canvas2.width, canvas2.height, 0, 0, width, height);
      return c.toDataURL();
    },
    createGif: function createGif(images) {
      var _this = this;

      this.SET_IS_RECORDING_NOW(false);
      this.SET_CURRENT_RECORD_STATUS('render');
      gifshot_default.a.createGIF({
        images: images,
        gifWidth: this.maxDimension,
        gifHeight: this.maxDimension,
        numWorkers: 4,
        sampleInterval: 500,
        interval: 0.03,
        progressCallback: function progressCallback(captureProgress) {
          _this.renderStatus = captureProgress;
        }
      }, function (object) {
        if (!object.error) {
          var image = object.image;

          _this.SET_DL_NAME("planet-".concat(defaults["b" /* textures */][_this.settings.globeTexture], ".gif"));

          _this.SET_DL_GIF(image);

          _this.SET_DL_READY(true);

          _this.recordButtonDisabled = false;

          _this.SET_CURRENT_RECORD_STATUS('done');

          _this.SET_GIF_DATA([]);
        } else {
          _this.recordButtonDisabled = false;

          _this.SET_CURRENT_RECORD_STATUS('error');

          _this.SET_GIF_DATA([]);
        }
      });
    },
    initP5: function initP5() {
      var _this2 = this;

      var loadedRingsTexture;
      var loadedRingsTexture2;
      var loadedTextures = [];

      this.backLayer = function (p) {
        var bgShader;
        var loadedBgTexture;
        var backgroundGraphic;

        p.setup = function () {
          loadedBgTexture = p.loadImage(__webpack_require__(265), function (img) {
            p.image(img, -400, -400, 800, 800);
          });
          p.frameRate(30);
          p.createCanvas(800, 800, p.WEBGL);
          backgroundGraphic = p.createGraphics(800, 800, p.WEBGL);
          bgShader = p.createShader(threshold, remote_sky_threshold);
          p.shader(bgShader);
          bgShader.setUniform('thresholdValue', 0.4);
          p.setAttributes('preserveDrawingBuffer', true);
        };

        p.draw = function () {
          backgroundGraphic.clear();
          p.pixelDensity(_this2.pixelDensity);
          var diameter = 2 + 1.6 * (_this2.settings.globeDiameter / 170 - 0.5);
          backgroundGraphic.image(loadedBgTexture, -400 * diameter, -400 * diameter, 800 * diameter, 800 * diameter);
          bgShader.setUniform('color1', _this2.hexToRgb(_this2.$shadeHexColor(_this2.color1, 0.7)));
          bgShader.setUniform('color2', _this2.hexToRgb('#00000f'));
          bgShader.setUniform('color3', _this2.hexToRgb(_this2.$shadeHexColor(_this2.color2, 0.7)));
          bgShader.setUniform('tex0', backgroundGraphic);
          p.rect(0, 0, p.width, p.height);
        };
      };

      this.frontLayer = function (p) {
        var frontShader;
        var planetGraphic;

        p.setup = function () {
          p.createDiv().class('root');
          defaults["b" /* textures */].forEach(function (texture) {
            loadedTextures.push(p.loadImage(__webpack_require__(273)("./".concat(texture, ".jpg"))));
          });
          loadedRingsTexture = p.loadImage(__webpack_require__(281));
          loadedRingsTexture2 = p.loadImage(__webpack_require__(282));
          p.frameRate(30);
          p.createCanvas(800, 800, p.WEBGL);
          p.setAttributes('preserveDrawingBuffer', true);
          p.setAttributes('alpha', true);
          planetGraphic = p.createGraphics(800, 800, p.WEBGL);
          frontShader = p.createShader(threshold, remote_sky_threshold);
        };

        var frame = 1;
        var loopCount = 0;
        var recordingLoop = null;

        p.draw = function () {
          var _modelTypes$_this2$se, _this2$settings$globe;

          frame = frame + 0.0075 * _this2.settings.rotationSpeed * _this2.stopMultiplicator;
          loopCount = Math.floor(frame / (2 * Math.PI));
          var frameRotation = Math.round(frame % (2 * Math.PI) * 100) / 100;

          if (_this2.isRecordingNow) {
            _this2.SET_CURRENT_RECORD_STATUS('record');

            _this2.PUSH_GIF_DATA(_this2.getImageData(back.canvas, front.canvas, _this2.maxDimension, _this2.maxDimension));
          }

          if (frameRotation <= 0.1) {
            if (_this2.isRecording) {
              _this2.SET_IS_RECORDING_NOW(true);

              recordingLoop = loopCount;

              _this2.SET_IS_RECORDING(false);
            }

            if (_this2.isRecordingNow && loopCount > recordingLoop) {
              _this2.SET_IS_RECORDING_NOW(false);

              _this2.createGif(_this2.gifData);
            }
          }

          var modelTypeName = (_modelTypes$_this2$se = modelTypes[_this2.settings.modelType]) !== null && _modelTypes$_this2$se !== void 0 ? _modelTypes$_this2$se : 'sphere';
          planetGraphic.clear();
          p.pixelDensity(_this2.pixelDensity);
          planetGraphic.background(p.color(255, 0, 0));
          planetGraphic.noStroke();
          planetGraphic.fill(p.color(176, 176, 176));
          planetGraphic.texture(modelTypeName !== 'sphere' ? loadedRingsTexture2 : loadedRingsTexture);
          planetGraphic.push();
          planetGraphic.rotateY(frame);
          planetGraphic.rotateZ(0.25);
          planetGraphic.rotateX(-0.25);
          planetGraphic.rotateY(frame * 2);
          planetGraphic.push();
          var globeDiameter = _this2.settings.globeDiameter;
          var colorPresetUsed = _this2.colorPreset;
          planetGraphic.texture(loadedTextures[(_this2$settings$globe = _this2.settings.globeTexture) !== null && _this2$settings$globe !== void 0 ? _this2$settings$globe : 0]);

          switch (modelTypeName) {
            case 'box':
              planetGraphic[modelTypeName](globeDiameter + 20);
              break;

            default:
              planetGraphic[modelTypeName](globeDiameter, 24, 24);
          }

          planetGraphic.pop();
          planetGraphic.push();
          planetGraphic.rotateX(0);
          planetGraphic.rotateY(0);
          planetGraphic.rotateZ(0);
          planetGraphic.rotateX(Math.PI / 2);
          var torusDetailY = 2;

          switch (modelTypeName) {
            case 'torus':
              torusDetailY = 24;
              break;

            case 'box':
              torusDetailY = 4;
              break;
          }

          var torusCount = _this2.settings.ringsCount;
          var ringsDiameter = _this2.settings.ringsDiameter;
          var ringsDistance = _this2.settings.ringsDistance * 100;
          var ringBefore = 0;
          var tilt = _this2.settings.ringsTilt;

          if (torusCount >= 1) {
            planetGraphic.push();
            ringBefore = ringsDistance + globeDiameter + 30;
            planetGraphic.rotateX(tilt * -1);
            planetGraphic.torus(ringBefore, 4 + ringsDiameter, 48, torusDetailY);
            planetGraphic.pop();
          }

          if (torusCount >= 2) {
            planetGraphic.push();
            ringBefore = ringBefore + 20 + ringsDiameter * 2;
            planetGraphic.rotateX(tilt * 2);
            planetGraphic.rotateZ(frame * -0.025);
            planetGraphic.torus(ringBefore, ringsDiameter, 48, torusDetailY);
            planetGraphic.pop();
          }

          if (torusCount >= 3) {
            planetGraphic.push();
            ringBefore = ringBefore + 50 + ringsDiameter * 2;
            planetGraphic.rotateZ(frame * -0.1);
            planetGraphic.rotateX(tilt * 0.3);
            planetGraphic.torus(ringBefore, 11 + ringsDiameter, 48, torusDetailY);
            planetGraphic.pop();
          }

          if (torusCount >= 4) {
            planetGraphic.push();
            ringBefore = ringBefore + 20 + ringsDiameter * 2;
            planetGraphic.rotateZ(frame * -0.015);
            planetGraphic.rotateX(tilt * -1.5);
            planetGraphic.torus(ringBefore, ringsDiameter / 2, 48, torusDetailY);
            planetGraphic.pop();
          }

          planetGraphic.pop();
          planetGraphic.pop();
          var threshold = parseFloat(_this2.settings.contrast);
          p.shader(frontShader);
          frontShader.setUniform('tex0', planetGraphic);

          if (colorPresetUsed) {
            frontShader.setUniform('color1', _this2.hexToRgb(_this2.colorPresets[colorPresetUsed][0]));
            frontShader.setUniform('color2', _this2.hexToRgb(_this2.colorPresets[colorPresetUsed][1]));
            frontShader.setUniform('color3', _this2.hexToRgb(_this2.colorPresets[colorPresetUsed][2]));
          } else {
            frontShader.setUniform('color1', _this2.hexToRgb(_this2.color1));
            frontShader.setUniform('color2', _this2.hexToRgb(_this2.color2));
            frontShader.setUniform('color3', _this2.hexToRgb(_this2.color3));
          }

          frontShader.setUniform('thresholdValue', threshold);
          p.rect(0, 0, p.width, p.height);
        };
      };

      back = new p5_min_default.a(this.backLayer);
      front = new p5_min_default.a(this.frontLayer);
    }
  }),
  mounted: function mounted() {
    var _this3 = this;

    this.getColorMap(this.settings.colorName);
    this.initP5();
    document.addEventListener('keyup', function (event) {
      if (event.keyCode === 32 && _this3.stopMultiplicator !== 0) {
        _this3.SET_STOP_MULTIPLICATOR(0);
      } else {
        _this3.SET_STOP_MULTIPLICATOR(1);
      }
    });
  }
}));
// CONCATENATED MODULE: ./components/remote-sky/Renderer.vue?vue&type=script&lang=js&
 /* harmony default export */ var remote_sky_Renderervue_type_script_lang_js_ = (Renderervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(48);

// CONCATENATED MODULE: ./components/remote-sky/Renderer.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  remote_sky_Renderervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Renderer = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_cf857690_prod_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(324);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_cf857690_prod_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_cf857690_prod_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(107);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\ncanvas {\n    image-rendering: pixelated;\n}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/remote-sky/index.vue?vue&type=template&id=cf857690&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c,
      _setup = _vm._self._setupProxy;

  return _c('div', [_c('Receiver', [_c('Renderer')], 1)], 1);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/remote-sky/index.vue?vue&type=template&id=cf857690&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(49);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(63);

// EXTERNAL MODULE: ./components/Receiver.vue + 4 modules
var Receiver = __webpack_require__(263);

// EXTERNAL MODULE: ./components/remote-sky/Renderer.vue + 6 modules
var Renderer = __webpack_require__(328);

// EXTERNAL MODULE: ./assets/remote-sky/defaults.ts
var defaults = __webpack_require__(262);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--13-0!./node_modules/ts-loader??ref--13-1!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/remote-sky/index.vue?vue&type=script&lang=ts&









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }






/* harmony default export */ var remote_skyvue_type_script_lang_ts_ = (vue_runtime_esm["a" /* default */].extend({
  name: 'IndexPage',
  components: {
    Receiver: Receiver["default"],
    Renderer: Renderer["default"]
  },
  methods: _objectSpread({}, Object(vuex_esm["c" /* mapMutations */])(['POPULATE_STORE'])),
  beforeMount: function beforeMount() {
    this.POPULATE_STORE(defaults["a" /* defaults */]);
  }
}));
// CONCATENATED MODULE: ./pages/remote-sky/index.vue?vue&type=script&lang=ts&
 /* harmony default export */ var pages_remote_skyvue_type_script_lang_ts_ = (remote_skyvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./pages/remote-sky/index.vue?vue&type=style&index=0&id=cf857690&prod&lang=css&
var remote_skyvue_type_style_index_0_id_cf857690_prod_lang_css_ = __webpack_require__(382);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(48);

// CONCATENATED MODULE: ./pages/remote-sky/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_remote_skyvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var remote_sky = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {Receiver: __webpack_require__(263).default})


/***/ })

}]);