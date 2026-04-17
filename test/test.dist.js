// @pak-module:
// - Source generated:
//    - date:         Sat Apr 18 2026 01:22:54 GMT+0200 (hora de verano de Europa central)
//    - time:         0.038 seconds
//    - modules:      18
//       - 0. Pak.require("01. Simple test/mod-a/mod-a1.js")
//       - 1. Pak.require("01. Simple test/mod-a/mod-a2.js")
//       - 2. Pak.require("01. Simple test/mod-a/mod-a3.js")
//       - 3. Pak.require("01. Simple test/mod-a.js")
//       - 4. Pak.require("01. Simple test/mod-b/componente-b1.js")
//       - 5. Pak.require("01. Simple test/mod-b/componente-b2.js")
//       - 6. Pak.require("01. Simple test/mod-b/componente-b3.js")
//       - 7. Pak.require("01. Simple test/mod-b.js")
//       - 8. Pak.require("01. Simple test/index.js")
//       - 9. Pak.require("02. Drivers test/modules/first.js")
//       - 10. Pak.require("02. Drivers test/modules/second.js")
//       - 11. Pak.require("02. Drivers test/modules/third.js")
//       - 12. Pak.require("02. Drivers test/index.js")
//       - 13. Pak.require("03. Evaluator test/index.js")
//       - 14. Pak.require("04. Environment dependant modules test/index.js")
//       - 15. Pak.require("05. Command line interface/index.js")
//       - 16. Pak.require("06. Html and css modules test/index.js")
//       - 17. Pak.require("test.js")
//    - styles:       4
//       - 0. Pak.require("01. Simple test/mod-a/styles-a.css")
//       - 1. Pak.require("01. Simple test/mod-a/styles-a1.css")
//       - 2. Pak.require("01. Simple test/mod-a/styles-a2.css")
//       - 3. Pak.require("01. Simple test/mod-a/styles-a3.css")
//    - templates:    3
//       - 0. Pak.require("01. Simple test/mod-b/componente-b1.html")
//       - 1. Pak.require("01. Simple test/mod-b/componente-b2.html")
//       - 2. Pak.require("01. Simple test/mod-b/componente-b3.html")
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
    entry: "test",
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
      "drivers-test/first": "02. Drivers test/modules/first.js",
      "drivers-test/second": "02. Drivers test/modules/second.js",
      "drivers-test/third": "02. Drivers test/modules/third.js",
      "drivers-test/modules": "02. Drivers test/modules"
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

  // @module[1] = 01. Simple test/mod-a/mod-a1.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    Pak.require("01. Simple test/mod-a/styles-a1.css");
    Pak.modules["01. Simple test/mod-a/mod-a1.js"] = module.exports;
  });
  // @module[2] = 01. Simple test/mod-a/mod-a2.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    Pak.require("01. Simple test/mod-a/styles-a2.css");

    Pak.modules["01. Simple test/mod-a/mod-a2.js"] = module.exports;
  });
  // @module[3] = 01. Simple test/mod-a/mod-a3.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    Pak.require("01. Simple test/mod-a/styles-a3.css");

    Pak.modules["01. Simple test/mod-a/mod-a3.js"] = module.exports;
  });
  // @module[4] = 01. Simple test/mod-a.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    const a1 = Pak.require("01. Simple test/mod-a/mod-a1.js");
    const a2 = Pak.require("01. Simple test/mod-a/mod-a2.js");
    const a3 = Pak.require("01. Simple test/mod-a/mod-a3.js");


    Pak.modules["01. Simple test/mod-a.js"] = module.exports;
  });
  // @module[5] = 01. Simple test/mod-b/componente-b1.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    module.exports = {
      name: "whatever",
      template: "TEMPLATE DE B1.html"
    };
    Pak.modules["01. Simple test/mod-b/componente-b1.js"] = module.exports;
  });
  // @module[6] = 01. Simple test/mod-b/componente-b2.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {

    Pak.modules["01. Simple test/mod-b/componente-b2.js"] = module.exports;
  });
  // @module[7] = 01. Simple test/mod-b/componente-b3.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {

    Pak.modules["01. Simple test/mod-b/componente-b3.js"] = module.exports;
  });
  // @module[8] = 01. Simple test/mod-b.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    Pak.require("01. Simple test/mod-b/componente-b1.html");
    Pak.require("01. Simple test/mod-b/componente-b2.html");
    Pak.require("01. Simple test/mod-b/componente-b3.html");
    Pak.modules["01. Simple test/mod-b.js"] = module.exports;
  });
  // @module[9] = 01. Simple test/index.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    const a = Pak.require("01. Simple test/mod-a.js");
    const b = Pak.require("01. Simple test/mod-b.js");

    module.exports
    Pak.modules["01. Simple test/index.js"] = module.exports;
  });
  // @module[10] = 02. Drivers test/modules/first.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    module.exports = 1;
    Pak.modules["02. Drivers test/modules/first.js"] = module.exports;
  });
  // @module[11] = 02. Drivers test/modules/second.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    module.exports = 2;

    Pak.modules["02. Drivers test/modules/second.js"] = module.exports;
  });
  // @module[12] = 02. Drivers test/modules/third.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    module.exports = 3;

    Pak.modules["02. Drivers test/modules/third.js"] = module.exports;
  });
  // @module[13] = 02. Drivers test/index.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    const first = Pak.require("02. Drivers test/modules/first.js");
    const second = Pak.require("02. Drivers test/modules/second.js");
    const third = Pak.require("02. Drivers test/modules/third.js");

    Pak.assert(first === 1, "First should be 1");
    Pak.assert(second === 2, "Second should be 2");
    Pak.assert(third === 3, "Third should be 3");

    const first2 = Pak.require("drivers-test/first");
    const second2 = Pak.require("drivers-test/second");
    const third2 = Pak.require("drivers-test/modules/third.js");

    Pak.assert(first === first2, "First should be 1 like first2");
    Pak.assert(second === second2, "Second should be 2 like second2");
    Pak.assert(third === third2, "Third should be 3 like third2");
    Pak.modules["02. Drivers test/index.js"] = module.exports;
  });
  // @module[14] = 03. Evaluator test/index.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    // Ya viene importado del test.js:
    // require(__dirname + "/../pak-compiler.dist.js");

    (async function main() {

      const mod78 = await PakCompiler.global.run("03. Evaluator test/mod78.js");

      PakCompiler.assert(78 === mod78, "Module mod78 should be 78");

    })();
    Pak.modules["03. Evaluator test/index.js"] = module.exports;
  });
  // @module[15] = 04. Environment dependant modules test/index.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    (async function main() {
      const fs = require("fs");
      const read = file => fs.promises.readFile(file, "utf8");
      const write = (file, content) => fs.promises.writeFile(file, content, "utf8");
      const assert = PakCompiler.assert;
      let payload = ""; // @OK: con esto, pasa ok
      payload = "-cross"; // @TODO: ahora tiene que pasar con esto
      const outputs = await Promise.all([
        PakCompiler.global.build(`04. Environment dependant modules test/entries${payload}/cli.js`),
        PakCompiler.global.build(`04. Environment dependant modules test/entries${payload}/gui.js`),
        PakCompiler.global.build(`04. Environment dependant modules test/entries${payload}/server.js`),
        PakCompiler.global.build(`04. Environment dependant modules test/entries${payload}/nodejs.js`),
        PakCompiler.global.build(`04. Environment dependant modules test/entries${payload}/browser.js`)
      ]);
      const [cli, gui, server, nodejs, browser] = outputs;
      await write(`${__dirname}/04. Environment dependant modules test/environments/cli/test.cli-dist.js`, cli.js);
      await write(`${__dirname}/04. Environment dependant modules test/environments/gui/test.gui-dist.js`, gui.js);
      await write(`${__dirname}/04. Environment dependant modules test/environments/server/test.server-dist.js`, server.js);
      await write(`${__dirname}/04. Environment dependant modules test/environments/nodejs/test.nodejs-dist.js`, nodejs.js);
      await write(`${__dirname}/04. Environment dependant modules test/environments/browser/test.browser-dist.js`, browser.js);
      const cliModule = require(`${__dirname}/04. Environment dependant modules test/environments/cli/test.cli-dist.js`);
      const guiModule = require(`${__dirname}/04. Environment dependant modules test/environments/gui/test.gui-dist.js`);
      const serverModule = require(`${__dirname}/04. Environment dependant modules test/environments/server/test.server-dist.js`);
      const nodejsModule = require(`${__dirname}/04. Environment dependant modules test/environments/nodejs/test.nodejs-dist.js`);
      const browserModule = require(`${__dirname}/04. Environment dependant modules test/environments/browser/test.browser-dist.js`);
      assert(cliModule === "cli", "Module cli should be 'cli'");
      assert(guiModule === "gui", "Module gui should be 'gui'");
      assert(serverModule === "server", "Module server should be 'server'");
      assert(nodejsModule === "nodejs", "Module nodejs should be 'nodejs'");
      assert(browserModule === "browser", "Module browser should be 'browser'");
    })();
    Pak.modules["04. Environment dependant modules test/index.js"] = module.exports;
  });
  // @module[16] = 05. Command line interface/index.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    (async function main() {
      const fs = require("fs");
      const timers = require("timers");
      const child_process = require("child_process");
      const read = file => fs.promises.readFile(file, "utf8");
      const write = (file, content) => fs.promises.writeFile(file, content, "utf8");
      const assert = PakCompiler.assert;
      try {
        await fs.promises.rm(`${__dirname}/05. Command line interface/nowatch`, {
          recursive: true
        });
      } catch (error) {
        // @OK because it should not exist already
      }
      // await timers.promises.setTimeout(200);
      await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch`);
      await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch/example-1`);
      await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch/example-2`);
      await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch/example-3`);
      child_process.execSync(`pak init`, {
        cwd: `${__dirname}/05. Command line interface/nowatch/example-1`,
        stdio: "inherit"
      });
      child_process.execSync(`pak init`, {
        cwd: `${__dirname}/05. Command line interface/nowatch/example-2`,
        stdio: "inherit"
      });
      child_process.execSync(`pak init`, {
        cwd: `${__dirname}/05. Command line interface/nowatch/example-3`,
        stdio: "inherit"
      });
      await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch/example-3/pak_modules/projects/default`);
      await write(`${__dirname}/05. Command line interface/nowatch/example-3/hello.txt`, "");
      await write(`${__dirname}/05. Command line interface/nowatch/example-3/pak_modules/projects/default/main.js`, "require('fs').writeFileSync(__dirname + '/hello.txt', 'hello from example 3', 'utf8');", "utf8");
      child_process.execSync(`pak run`, {
        cwd: `${__dirname}/05. Command line interface/nowatch/example-3`,
        stdio: "inherit"
      });
      PakCompiler.assert("hello from example 3" === await read(`${__dirname}/05. Command line interface/nowatch/example-3/pak_modules/dist/default/hello.txt`), "File hello.txt should be fulfilled adecuately");
      await fs.promises.rm(`${__dirname}/05. Command line interface/nowatch`, {
        recursive: true
      });
    })();
    Pak.modules["05. Command line interface/index.js"] = module.exports;
  });
  // @module[17] = 06. Html and css modules test/index.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    (async function main() {
      const path = require("path");
      const projectRoot = path.resolve(__dirname + "/06. Html and css modules test/modules");
      const compiler = PakCompiler.create(projectRoot);
      const bundleData = await compiler.build("main.js");
      const htmlModule = await compiler.run("main.js");
      // Note the template was injected where it was suposed to:
      PakCompiler.assert(typeof htmlModule.name === "string", "Property name must be string");
      PakCompiler.assert(typeof htmlModule.template === "string", "Property template must be string too");
      PakCompiler.assert(typeof htmlModule.template.indexOf("Component") !== -1, "Property template must contain Component substring");
      // Note the order they are loaded is the correct:
      PakCompiler.assert(bundleData.cssModules[0] === "anteriores-estilos-a.css");
      PakCompiler.assert(bundleData.cssModules[1] === "anteriores-estilos-b.css");
      PakCompiler.assert(bundleData.cssModules[2] === "component-1.css");
    })();
    Pak.modules["06. Html and css modules test/index.js"] = module.exports;
  });
  // @module[18] = test.js
  __LAST_PAK_RESULT__ = (factory => {
    const m = {
      exports: undefined
    };
    factory(m);
    return m.exports;
  })(function(module) {
    Pak.require("01. Simple test/index.js");
    Pak.require("02. Drivers test/index.js");
    Pak.require("03. Evaluator test/index.js");
    Pak.require("04. Environment dependant modules test/index.js");
    Pak.require("05. Command line interface/index.js");
    Pak.require("06. Html and css modules test/index.js");
    Pak.modules["test.js"] = module.exports;
  });

  if (typeof module !== "undefined") module.exports = __LAST_PAK_RESULT__;

  return __LAST_PAK_RESULT__;

})(typeof Pak !== "undefined" ? Pak : false)