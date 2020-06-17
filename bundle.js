/* eslint-disable */
(function(modules) {
  function require (id) { //�
    const [fn, mapping] = modules[id];

    function localRequire (name) { //⏰
      return require(mapping[name]); //�
    }

    const module = { exports: {} };

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  require(0);
})({
  0: [
    function(require, module, exports) {
      "use strict";

      var _message = require("./message.js");
      console.log(_message, '_message');
      var _message2 = _interopRequireDefault(_message);

      function _interopRequireDefault (obj) {
        return obj && obj.__esModule
          ? obj
          : { default: obj };
      }

      console.log(_message2.default);
    },
    { "./message.js": 1 }
  ], 1: [
    function(requires, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _name = requires("./name.js");
      console.log(_name, '_name');

      var _test = require("./test.js");
      console.log(_test, '_test');
      console.log(_test.test);
      exports.default = "hello " + _name.name + "!";
    },
    { "./name.js": 2, "./test.js": 3 }
  ], 2: [
    function(require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var name = exports.name = "world";
    },
    {}
  ], 3: [
    function(requires, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var test = exports.test = "test";
    },
    {}
  ]
});
