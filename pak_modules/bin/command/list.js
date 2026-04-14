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
      const num = utils.colors.style("magenta,bold").text(`[-i ${('' + index).padStart((allJsFiles.length + '').length, '0')}]`);
      console.log(`   ${num} Pak.require("${jsFile}")`);
    }
  } else if (hasItems) {
    const allMetadata = {};
    for (let index = 0; index < args.item.length; index++) {
      const i = args.item[index];
      const jsFile = allJsFiles[i];
      const num = utils.colors.style("green,bold").text(`[-i ${i}]`);
      const fullpath = path.resolve(pakModulesDir, jsFile);
      const size = fs.readFileSync(fullpath).toString().length;
      const metadata = {};
      try {
        metadata.doc = fs.readFileSync(fullpath.replace(/\.js$/g, ".md")).toString();
      } catch (error) {
        metadata.doc = false;
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
    const findClosestPakProjectDirectory = require(`${projectRoot}/pak_modules/api/pak/nodejs/findClosestPakProjectDirectory.js`);
    const projectPath = await findClosestPakProjectDirectory(process.cwd());
    const pakModulesDir = path.resolve(projectPath, "pak_modules");
    const fixedCmdOptions = { stdio: "inherit" };
    const listables = {
      commands: () => { listJsFilesFrom(args, utils, pakModulesDir, "bin/command"); },
      api: () => { listJsFilesFrom(args, utils, pakModulesDir, "api"); },
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