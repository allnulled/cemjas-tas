// @pak-module:
// - Source generated:
//    - date:         Sat Apr 18 2026 01:22:55 GMT+0200 (hora de verano de Europa central)
//    - time:         0.018 seconds
//    - modules:      4
//       - 0. Pak.require("projects/currently/rubish/mod2.js")
//       - 1. Pak.require("projects/currently/rubish/mod1.js")
//       - 2. Pak.require("projects/currently/rubish/test.js")
//       - 3. Pak.require("projects/currently/rubish.js")
//    - styles:       0
//    - templates:    0
// @module[main] = Pak
(function(globalPak) {
  //////////////////////////////////////////////////////////////////////////////
  let __LAST_PAK_RESULT__ = undefined;
  const Pak = {
    // API de Pak Asserter: 1/4
    assert: (condition, message) => {
      if (!condition) {
        throw new Error(message);
      }
    },
    // API de Pak Modules: 2/4
    entry: "rubish",
    modules: typeof globalPak === "object" ? Object.create(globalPak.modules) : {},
    require: function(originalId) {
      const id = Pak.resolveDriver(originalId);
      if (id.endsWith(".css")) {
        return undefined;
      }
      if (id.endsWith(".html")) {
        return Pak.modules[id.replace(/\.html$/g, ".js")];
      }
      if (!(id in Pak.modules)) {
        throw new Error("Module not found «" + id + "» on «Pak.require»");
      }
      return Pak.modules[id];
    },
    // API de Pak Drivers: 3/4
    drivers: {
      "!{api}": "api"
    },
    driverIds: false,
    resolveDriver: function(id) {
      if (!this.driverIds) {
        this.driverIds = Object.keys(this.drivers).sort((a, b) => {
          return a.length > b.length ? -1 : a.length < b.length ? 1 : 0;
        });
      }
      for (let index = 0; index < this.driverIds.length; index++) {
        const key = this.driverIds[index];
        if (id.startsWith(key)) {
          return id.replace(key, this.drivers[key]);
        }
      }
      return id;
    },
    // API de Pak Static: 4/4
    static: {},
  };
  // Exporta Pak si no hay ya uno:
  if (typeof window !== "undefined" && typeof window.Pak === "undefined") window.Pak = Pak;
  if (typeof global !== "undefined" && typeof global.Pak === "undefined") global.Pak = Pak;
  //////////////////////////////////////////////////////////////////////////////

  // @module[1] = projects/currently/rubish/mod2.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    console.log("mod2");
    // console.log(Pak.require("projects/currently/rubish/mod1.js"));
    Pak.modules["projects/currently/rubish/mod2.js"] = module.exports;
  });
  // @module[2] = projects/currently/rubish/mod1.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    console.log("mod1");
    Pak.require("projects/currently/rubish/mod2.js");
    Pak.modules["projects/currently/rubish/mod1.js"] = module.exports;
  });
  // @module[3] = projects/currently/rubish/test.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    console.log("hi")
    console.log("hi")
    console.log("hi")
    console.log("hi")

    Pak.require("projects/currently/rubish/mod1.js");
    Pak.modules["projects/currently/rubish/test.js"] = module.exports;
  });
  // @module[4] = projects/currently/rubish.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    module.exports = Pak.require("projects/currently/rubish/test.js");
    Pak.modules["projects/currently/rubish.js"] = module.exports;
  });

  if (typeof module !== "undefined") module.exports = __LAST_PAK_RESULT__;

  return __LAST_PAK_RESULT__;

})(typeof Pak !== "undefined" ? Pak : false)