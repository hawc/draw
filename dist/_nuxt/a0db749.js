(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15,9,12],{

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/PeerController.vue?vue&type=template&id=524a6c46&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c,
      _setup = _vm._self._setupProxy;

  return _c('div');
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/PeerController.vue?vue&type=template&id=524a6c46&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__(270);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.js
var web_url_search_params = __webpack_require__(181);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/peerjs/dist/bundler.mjs
var bundler = __webpack_require__(258);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/PeerController.vue?vue&type=script&lang=js&









/* harmony default export */ var PeerControllervue_type_script_lang_js_ = (vue_runtime_esm["a" /* default */].extend({
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
      connection: null,
      controlSettings: {}
    };
  },
  watch: {
    controlSettings: {
      deep: true,
      handler: function handler(settings) {
        this.optionsSetter(settings);
        this.sendMessage({
          settings: settings
        });
      }
    },
    settings: {
      deep: true,
      handler: function handler(settings) {
        this.controlSettings = JSON.parse(JSON.stringify(settings));
      }
    }
  },
  methods: {
    showCallContent: function showCallContent() {
      this.$emit('message', 'Please connect.');
    },
    sendMessage: function sendMessage() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.connection) {
        this.connection.send(data);
      }
    },
    resetStoreSettings: function resetStoreSettings() {
      // We need to clear the store to refresh the DOM
      // TODO: Only pre-populate store on renderer side
      var resetSettings = JSON.parse(JSON.stringify(this.settings));
      Object.keys(resetSettings).forEach(function (key) {
        return resetSettings[key] = null;
      });
      this.optionsSetter(resetSettings);
    },
    connectPeers: function connectPeers() {
      var _url$searchParams$get,
          _this = this;

      var url = new URL(window.location.href);
      var code = (_url$searchParams$get = url.searchParams.get('k')) !== null && _url$searchParams$get !== void 0 ? _url$searchParams$get : prompt('Please enter key code.');

      if (code) {
        this.connection = this.peer.connect(code);
        this.connection.on('open', function () {
          _this.resetStoreSettings();

          _this.connection.on('data', function (data) {
            if ('settings' in data) {
              _this.optionsSetter(data.settings);

              _this.controlSettings = data.settings;
            }
          });

          _this.connection.on('close', function () {
            _this.showCallContent();
          });

          _this.$emit('message', "You're connected.");
        });
        this.connection.on('error', function (error) {
          console.error('Error connecting: ', error);
        });
      }
    },
    call: function call() {
      this.connectPeers();
    },
    recall: function recall() {
      this.connection = this.peer.reconnect();
      this.$emit('message', "You're connected.");
    },
    hangUp: function hangUp() {
      this.connection.close();
      this.showCallContent();
    },
    initPeer: function initPeer() {
      var _this2 = this;

      this.peer.on('open', function () {
        _this2.$emit('message', 'Please connect.');

        _this2.call();

        _this2.peer.on('close', function () {
          _this2.showCallContent();
        });

        _this2.peer.on('disconnected', function () {
          _this2.$emit('message', 'You are Disconnected. Please reload.');
        });
      });
      this.peer.on('error', function (data) {
        console.error(data);
      });
    }
  },
  mounted: function mounted() {
    this.peer = new bundler["a" /* default */](this.$getKey(), {
      host: location.hostname,
      path: '/myapp',
      port:  true ? 443 : undefined,
      // using port 443 on prod because the nginx proxy redirects wss the traffic
      secure: "production" === 'production',
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
// CONCATENATED MODULE: ./components/PeerController.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PeerControllervue_type_script_lang_js_ = (PeerControllervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(48);

// CONCATENATED MODULE: ./components/PeerController.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_PeerControllervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PeerController = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(267);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(108).default
var update = add("289f56ef", content, true, {"sourceMap":false});

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

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Sender.vue?vue&type=template&id=13992b0e&scoped=true&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c,
      _setup = _vm._self._setupProxy;

  return _c('div', [_c('div', {
    staticClass: "controls"
  }, _vm._l(_vm.controllers, function (controller, controllerKey) {
    return _c('div', {
      key: controllerKey,
      staticClass: "row"
    }, [_c('label', {
      attrs: {
        "for": controllerKey
      }
    }, [_vm._v(_vm._s(controllerKey))]), _vm._v(" "), _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.number",
        value: _vm.controlSettings[controllerKey],
        expression: "controlSettings[controllerKey]",
        modifiers: {
          "number": true
        }
      }],
      attrs: {
        "id": controllerKey,
        "type": "range",
        "min": controller.min,
        "max": controller.max,
        "step": controller.step
      },
      domProps: {
        "value": _vm.controlSettings[controllerKey]
      },
      on: {
        "__r": function __r($event) {
          _vm.$set(_vm.controlSettings, controllerKey, _vm._n($event.target.value));
        },
        "blur": function blur($event) {
          return _vm.$forceUpdate();
        }
      }
    })]);
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "container container--controls"
  }, [_c('p', [_vm._v("\n                " + _vm._s(_vm.statusMessage) + "\n            ")])]), _vm._v(" "), _c('PeerController', {
    ref: "controller",
    attrs: {
      "settings": _vm.settings,
      "options-setter": _vm.SET_OPTIONS
    },
    on: {
      "message": _vm.setMessage
    }
  })], 1);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/Sender.vue?vue&type=template&id=13992b0e&scoped=true&

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

// EXTERNAL MODULE: ./components/PeerController.vue + 4 modules
var PeerController = __webpack_require__(257);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Sender.vue?vue&type=script&lang=js&









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }




/* harmony default export */ var Sendervue_type_script_lang_js_ = (vue_runtime_esm["a" /* default */].extend({
  components: {
    PeerController: PeerController["default"]
  },
  props: {
    controllers: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      statusMessage: 'Connecting...',
      controlSettings: {}
    };
  },
  watch: {
    controlSettings: {
      deep: true,
      handler: function handler(settings) {
        this.SET_OPTIONS(settings);
        this.$refs.controller.sendMessage({
          settings: settings
        });
      }
    },
    settings: {
      deep: true,
      handler: function handler(settings) {
        this.controlSettings = JSON.parse(JSON.stringify(settings));
      }
    }
  },
  computed: _objectSpread({}, Object(vuex_esm["d" /* mapState */])(['settings'])),
  methods: _objectSpread(_objectSpread({}, Object(vuex_esm["b" /* mapActions */])(['SET_OPTIONS', 'addMidiController'])), {}, {
    setMessage: function setMessage(message) {
      this.statusMessage = message;
    }
  }),
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.addMidiController();
    });
  }
}));
// CONCATENATED MODULE: ./components/Sender.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Sendervue_type_script_lang_js_ = (Sendervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./components/Sender.vue?vue&type=style&index=0&id=13992b0e&prod&scoped=true&lang=css&
var Sendervue_type_style_index_0_id_13992b0e_prod_scoped_true_lang_css_ = __webpack_require__(266);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(48);

// CONCATENATED MODULE: ./components/Sender.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Sendervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "13992b0e",
  null
  
)

/* harmony default export */ var Sender = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {PeerController: __webpack_require__(257).default})


/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sender_vue_vue_type_style_index_0_id_13992b0e_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(259);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sender_vue_vue_type_style_index_0_id_13992b0e_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sender_vue_vue_type_style_index_0_id_13992b0e_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(107);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\nhr[data-v-13992b0e] {\n        position: relative;\n        height: 4px;\n        width: 4px;\n        margin: 20px auto;\n        border: none;\n        background: hotpink;\n        overflow: visible;\n}\nhr[data-v-13992b0e]::before {\n        display: block;\n        content: '';\n        position: absolute;\n        top: 0;\n        height: 4px;\n        width: 4px;\n        left: -10px;\n        background: hotpink;\n}\nhr[data-v-13992b0e]::after {\n        display: block;\n        content: '';\n        position: absolute;\n        top: 0;\n        height: 4px;\n        width: 4px;\n        right: -10px;\n        background: hotpink;\n}\n.row[data-v-13992b0e] {\n        padding: 3px 0;\n}\n.center[data-v-13992b0e] {\n        text-align: center;\n}\n.controls[data-v-13992b0e] {\n        z-index: 1;\n}\na[data-v-13992b0e]:link {\n        color: white;\n}\na[data-v-13992b0e]:hover,\n    a[data-v-13992b0e]:focus,\n    a[data-v-13992b0e]:active {\n        color: rgb(192, 192, 192);\n}\nbutton[data-v-13992b0e] {\n        -moz-appearance: none;\n        -webkit-appearance: none;\n        align-items: center;\n        border: 1px solid transparent;\n        border-radius: 5px;\n        box-shadow: none;\n        display: inline-block;\n        justify-content: flex-start;\n        padding: 10px 20px;\n        position: relative;\n        vertical-align: top;\n        background: white;\n        color: black;\n        line-height: 1;\n        font-size: 1rem;\n        cursor: pointer;\n        transition: background 0.3s;\n        text-decoration: none;\n}\nbutton[data-v-13992b0e]:hover {\n        background: #eee;\n}\nbutton[data-v-13992b0e]:active,\n    button[data-v-13992b0e]:focus {\n        background: #ccc;\n}\nbutton[disabled][data-v-13992b0e],\n    .button.disabled[data-v-13992b0e] {\n        opacity: 0.5;\n        pointer-events: none;\n}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(388);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(108).default
var update = add("0eb817d2", content, true, {"sourceMap":false});

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_sender_vue_vue_type_style_index_0_id_74e9fae8_prod_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(326);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_sender_vue_vue_type_style_index_0_id_74e9fae8_prod_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_sender_vue_vue_type_style_index_0_id_74e9fae8_prod_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(107);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\nbody {\n        background: #131200;\n        color: white;\n}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/remote-sky/sender.vue?vue&type=template&id=74e9fae8&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c,
      _setup = _vm._self._setupProxy;

  return _c('div', [_c('Sender', {
    attrs: {
      "controllers": _vm.defaults
    }
  })], 1);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/remote-sky/sender.vue?vue&type=template&id=74e9fae8&

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

// EXTERNAL MODULE: ./assets/remote-sky/defaults.ts
var defaults = __webpack_require__(262);

// EXTERNAL MODULE: ./components/Sender.vue + 4 modules
var Sender = __webpack_require__(264);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/remote-sky/sender.vue?vue&type=script&lang=js&









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }





/* harmony default export */ var sendervue_type_script_lang_js_ = (vue_runtime_esm["a" /* default */].extend({
  components: {
    Sender: Sender["default"]
  },
  data: function data() {
    return {
      defaults: defaults["a" /* defaults */]
    };
  },
  methods: _objectSpread({}, Object(vuex_esm["c" /* mapMutations */])(['POPULATE_STORE'])),
  beforeMount: function beforeMount() {
    this.POPULATE_STORE(defaults["a" /* defaults */]);
  }
}));
// CONCATENATED MODULE: ./pages/remote-sky/sender.vue?vue&type=script&lang=js&
 /* harmony default export */ var remote_sky_sendervue_type_script_lang_js_ = (sendervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./pages/remote-sky/sender.vue?vue&type=style&index=0&id=74e9fae8&prod&lang=css&
var sendervue_type_style_index_0_id_74e9fae8_prod_lang_css_ = __webpack_require__(387);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(48);

// CONCATENATED MODULE: ./pages/remote-sky/sender.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  remote_sky_sendervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var sender = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {Sender: __webpack_require__(264).default})


/***/ })

}]);