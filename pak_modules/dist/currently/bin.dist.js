// @pak-module:
// - Source generated:
//    - date:         Tue Apr 14 2026 16:41:42 GMT+0200 (hora de verano de Europa central)
//    - time:         0.017 seconds
//    - modules:      2
//       - 0. Pak.require("src/pak/nodejs/cmd/parseArgsIntoObject.js")
//       - 1. Pak.require("projects/currently/bin.js")
//    - styles:       0
//    - templates:    0
// @module[main] = Pak
(function(globalPak) {
  //////////////////////////////////////////////////////////////////////////////
  let __LAST_PAK_RESULT__ = undefined;
  const Pak = {
    // API de Pak Asserter: 1/3
    assert: (condition, message) => {
      if (!condition) {
        throw new Error(message);
      }
    },
    // API de Pak Modules: 2/3
    entry: "bin",
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
    // API de Pak Drivers: 3/3
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
  };
  // Exporta Pak si no hay ya uno:
  if (typeof window !== "undefined" && typeof window.Pak === "undefined") window.Pak = Pak;
  if (typeof global !== "undefined" && typeof global.Pak === "undefined") global.Pak = Pak;
  //////////////////////////////////////////////////////////////////////////////

  // @module[1] = src/pak/nodejs/cmd/parseArgsIntoObject.js
  (function(module) {
    try {
      module.exports = function(argv = process.argv, commands = {}) {
        const args = {
          _: []
        };
        const aliases = Object.keys(commands).reduce(function(out, key) {
          const command = commands[key];
          if (command.alias) {
            out[command.alias] = key;
          }
          return out;
        }, {});
        let lastParameter = "_";
        Iterating_parameters:
          for (let index = 0; index < argv.length; index++) {
            const arg = argv[index];
            if (arg.startsWith("--")) {
              const commandId = arg.substr(2);
              if (commandId in commands) {
                lastParameter = commandId;
                if (!(lastParameter in args)) args[lastParameter] = [];
                continue Iterating_parameters;
              }
            } else if (arg.startsWith("-")) {
              const aliasId = arg.substr(1);
              if (aliasId in aliases) {
                const commandId = aliases[aliasId];
                if (commandId in commands) {
                  lastParameter = commandId;
                  if (!(lastParameter in args)) args[lastParameter] = [];
                  continue Iterating_parameters;
                }
              }
            }
            args[lastParameter].push(arg);
          }
        return args;
      }
    } catch (error) {
      console.log("⛔️ Error on module src/pak/nodejs/cmd/parseArgsIntoObject.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["src/pak/nodejs/cmd/parseArgsIntoObject.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[2] = projects/currently/bin.js
  (function(module) {
    try {
      const parseArgsIntoObject = Pak.require("src/pak/nodejs/cmd/parseArgsIntoObject.js");
      const args = parseArgsIntoObject();

      console.log(args);

    } catch (error) {
      console.log("⛔️ Error on module projects/currently/bin.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["projects/currently/bin.js"] = module.exports;
    }
  })({
    exports: undefined
  });

  if (typeof module !== "undefined") module.exports = __LAST_PAK_RESULT__;

  return __LAST_PAK_RESULT__;

})(typeof Pak !== "undefined" ? Pak : false)