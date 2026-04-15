
const ErrorData = Pak.require("src/cem/error/ErrorData.js");

console.log(ErrorData.create({ line: 40, message: "something wrong", cause: "whatever", context: "wherever" }));

module.exports = ErrorData;