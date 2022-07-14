(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10,8],{

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
          console.log('Connection closed');
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


/***/ })

}]);