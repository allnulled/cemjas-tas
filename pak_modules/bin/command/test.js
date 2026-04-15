const fs = require("fs");
const path = require("path");

module.exports = async function (args1, utils) {
  try {
    const { projectRoot } = utils;
    const findClosestPakProjectDirectory = require(`${projectRoot}/pak_modules/src/pak/nodejs/findClosestPakProjectDirectory.js`);
    const projectDir = await findClosestPakProjectDirectory();
    const pakModulesDir = path.resolve(projectDir, "pak_modules");
    PakCompiler.global.setBasedir(pakModulesDir);
    if(args1.all) {
      const allTestInTest = fs.readdirSync(pakModulesDir + "/test", { recursive: true }).filter(f => f.endsWith(".js")).map(f => "test/" + f);
      const allTestInSrc = fs.readdirSync(pakModulesDir + "/src", { recursive: true }).filter(f => f.endsWith(".test.js")).map(f => "src/" + f);
      const allTests = allTestInTest.concat(allTestInSrc);
      for(let index=0; index<allTests.length; index++) {
        const testFile = allTests[index];
        const out = await PakCompiler.global.build(testFile);
        return eval(out.js);
      }
    } else {
      const file = args1._[1];
      const out = await PakCompiler.global.build(file);
      return eval(out.js);
    }
  } catch (error) {
    console.log(utils.colors.style("red,bold").text(`${error.name}: ${error.message}\n@@ ${error.stack}`));
  }
  // console.log(out.dist.js);
};