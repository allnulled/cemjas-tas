module.exports = class ErrorData extends Error {

  static create(...args) {
    return new this(...args);
  }

  constructor(details = {}) {
    super(JSON.stringify(details));
    this.details = details;
  }

  toString() {
    return JSON.stringify(this.details);
  }

};