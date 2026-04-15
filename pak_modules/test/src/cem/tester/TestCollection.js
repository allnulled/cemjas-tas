const TestCollection = Pak.require("src/cem/tester/TestCollection.js");
const { setTimeout } = require("timers/promises");
const tester = new TestCollection();

tester.define("Test nº 1", async function(assertion) {
  assertion(true, {message:"whatever"});
  tester.define("Test nº 1.1", async function(assertion) {
    assertion(true, {message:"whatever"});
    // await setTimeout(1000);
  });
  await setTimeout(1000);
});

tester.start().then(console.log);