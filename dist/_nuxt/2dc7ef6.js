(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

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

/***/ })

}]);