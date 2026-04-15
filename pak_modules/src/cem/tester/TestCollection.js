module.exports = class {
  specs = [];
  results = [];
  isRunningOn = -1;
  define(id, callback) {
    const testDefinition = { id, callback, definedAt: new Date() };
    if(this.isRunningOn !== -1) {
      this.specs.splice(this.isRunningOn+1, 0, testDefinition);
    } else {
      this.specs.push(testDefinition);
    }
    return this;
  }
  createAssertionFunction() {
    return (condition, details = {}) => {
      if(condition) return true;
      throw Pak.require("src/cem/error/ErrorData.js").create(details);
    };
  }
  async start() {
    if(this.finishedAt) {
      throw Pak.require("src/cem/error/ErrorData.js").create({ method: "TestCollection.prototype.start", reason: `Test collection has already been consumed on ${this.finishedAt}` });
    }
    this.results = [];
    for(this.isRunningOn=0; this.isRunningOn<this.specs.length; this.isRunningOn++) {
      const testMetadata = this.specs[this.isRunningOn];
      testMetadata.startedAt = new Date();
      try {
        await testMetadata.callback.call(this, this.createAssertionFunction());
        testMetadata.order = this.isRunningOn;
        testMetadata.success = true;
      } catch (error) {
        testMetadata.success = false;
        testMetadata.failedWith = error;
      }
      testMetadata.finishedAt = new Date();
      testMetadata.tookMilliseconds = testMetadata.finishedAt - testMetadata.startedAt;
      this.results.push(testMetadata);
    }
    return this.results;
  }
}