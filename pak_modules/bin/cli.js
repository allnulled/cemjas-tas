#!/usr/bin/env node

const commandsSchema = {
  help: {},
  init: {},
  list: {
    item: { alias: "i" },
  },
  build: {
    entry: { alias: "e" },
  },
  run: {
    entry: { alias: "e" },
    mode: { alias: "m" },
  }
};

const fs = require("fs");
const path = require("path");
const projectRoot = path.resolve(__dirname, "../..");
const PakCompilerPath = path.resolve(projectRoot, "pak-compiler.dist.js");
const PakCompiler = require(PakCompilerPath);
const colorsPath = path.resolve(projectRoot, "pak_modules/src/pak/nodejs/cmd/colors.js");
const colors = require(colorsPath);
PakCompiler.global.setBasedir(path.resolve(projectRoot, "pak_modules"));
const argumentsParser = require(PakCompiler.global.basedir + "/src/pak/nodejs/cmd/parseArgsIntoObject.js");
const argv = [...process.argv];
const args0 = argv.splice(2);
if(args0.length === 0) {
  require(__dirname + "/command/help.js")(args0);
  throw new Error(`Command «pak» requires at least 1 parameter for the command but 0 were found by command line arguments on «pak»`);
}
const [ command, project = "default" ] = args0;
if(!(command in commandsSchema)) {
  throw new Error(`Command «pak ${command}» is not available, only «${Object.keys(commandsSchema).join("|")}» on «pak»`);
}
const args1 = argumentsParser(args0, commandsSchema[command]);
// hasta aquí es cli
const callback = require(__dirname + "/command/" + command + ".js");
module.exports = callback(args1, { projectRoot, colors, PakCompiler, commandsSchema });