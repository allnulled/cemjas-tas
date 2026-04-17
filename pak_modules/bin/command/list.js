const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const projectRoot = path.resolve(__dirname, "../../..");
const relativePath = function (...args) {
  return path.resolve(projectRoot, ...args);
};
const listJsFilesFrom = function (args, utils, pakModulesDir, ...subpaths) {
  const allJsFiles = fs.readdirSync(path.resolve(pakModulesDir, ...subpaths), { recursive: true })
    .filter(f => f.endsWith(".js"))
    .map(f => path.join(...subpaths, f));
  const hasItems = args.item && args.item.length;
  if (!hasItems) {
    for (let index = 0; index < allJsFiles.length; index++) {
      const jsFile = allJsFiles[index];
      const num = utils.colors.style("magenta").text(`[-i ${('' + index).padStart((allJsFiles.length + '').length, '0')}]`);
      if(jsFile.endsWith(".test.js")) {
        console.log(`   ${num} ` + utils.colors.style("red").text(`Pak.require("${jsFile}")`));
      } else {
        const fileparts = jsFile.split("/");
        const filename = fileparts[fileparts.length-1];
        const firstChar = filename[0];
        const jsFileCool = jsFile.replace(/[A-Z]/g, m => " " + m.toLowerCase());
        if(firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase()) {
          console.log(`   ${num} ` + utils.colors.style("cyan").text(`Pak.require("${jsFile}")`));
        } else {
          console.log(`   ${num} ` + utils.colors.style("green").text(`Pak.require("${jsFileCool}")`));
        }
      }
    }
  } else if (hasItems) {
    // Este bloque no sé qué hace
    const allMetadata = {};
    for (let index = 0; index < args.item.length; index++) {
      const i = args.item[index];
      const jsFile = allJsFiles[parseInt(i)];
      const num = utils.colors.style("green,bold").text(`[-i ${parseInt(i)}]`);
      const fullpath = path.resolve(pakModulesDir, jsFile);
      const size = fs.readFileSync(fullpath).toString().length;
      const metadata = {};
      try {
        metadata.doc = fs.readFileSync(fullpath.replace(/\.js$/g, ".md")).toString();
      } catch (error) {
        metadata.doc = fs.readFileSync(fullpath).toString();
      }
      
      console.log(`   ${num} Pak.require("${jsFile}") [${size}]`);
      if(metadata.doc) {
        console.log(utils.colors.style("cyan,italic").text(`\n\n${metadata.doc}\n\n`));
      }
    }
  }
};

module.exports = async function (args, utils) {
  try {
    args._.shift();
    const { projectRoot } = utils;
    const targetType = args._.shift();
    const findClosestPakProjectDirectory = require(`${projectRoot}/pak_modules/src/pak/nodejs/findClosestPakProjectDirectory.js`);
    const projectPath = await findClosestPakProjectDirectory(process.cwd());
    const pakModulesDir = path.resolve(projectPath, "pak_modules");
    const fixedCmdOptions = { stdio: "inherit" };
    const listables = {
      commands: () => { listJsFilesFrom(args, utils, pakModulesDir, "bin/command"); },
      src: () => { listJsFilesFrom(args, utils, pakModulesDir, "src"); },
      projects: () => { listJsFilesFrom(args, utils, pakModulesDir, "projects"); },
      distribuibles: () => { listJsFilesFrom(args, utils, pakModulesDir, "dist"); },
    };
    if (!(targetType in listables)) {
      throw new Error(`Command «pak list ?» only accepts «${Object.keys(listables).join('|')}» and not «${targetType}»`);
    }
    const callback = listables[targetType];
    console.log(utils.colors.style("yellow,bold,underline").text(`[pak] List of ${targetType}:`));
    return callback();
  } catch (error) {
    console.log(utils.colors.style("red,bold").text(`${error.name}: ${error.message}\n@@ ${error.stack}`));
  }
};