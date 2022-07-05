(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

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

/***/ })

}]);