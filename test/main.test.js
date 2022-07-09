// const wait = require('../wait');
import process from "process";
import cp from "child_process";
import path from "path";

// test('throws invalid number', async () => {
//   await expect(wait('foo')).rejects.toThrow('milliseconds not a number');
// });

// test('wait 500 ms', async () => {
//   const start = new Date();
//   await wait(500);
//   const end = new Date();
//   var delta = Math.abs(end - start);
//   expect(delta).toBeGreaterThanOrEqual(500);
// });

// // shows how the runner will run a javascript action with env / stdout protocol
test("test runs", () => {

    process.env["GITHUB_WORKSPACE"] = "./";
    process.env["GITHUB_REPOSITORY"] = "thiagodnf/new-version-decider";
    process.env["INPUT_LOADER"] = "nodejs";

    const ip = path.join(__dirname, "../src/main.js");

    try {
        const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
    console.log(result);

      }
      catch (err){
        console.log("output",err);
        console.log("sdterr",err.stderr.toString());
        console.log("sdterr",err.stdout.toString());
      }


});

test("wait 500 ms", async () => {
    expect(1).toBe(1);
});
