const tough = require("tough-cookie");
const {config} = require("../config");

// Sets multiple cookies on the jar.
const setCookies = async (jar, cookieDataArray) => {
  validateJarAndCookies(jar, cookieDataArray);
  return Promise.all(cookieDataArray.map(({cookieString, url}) => setCookie(jar, cookieString, url)));
};

// Sets a cookie on the jar.
const setCookie = async (jar, cookieString, url) => {
  return new Promise((resolve, reject) => {
    jar.setCookie(cookieString, url, {}, (err, cookie) => {
      if (err) {
        return reject(err)
      }
      resolve(cookie);
    });
  });
};

// Checks if the provided cookie is polluted.
const isCookiePolluted = (cookie) => {
  const result = cookie === config.exploitCookieValue ? config.exploitedSuccessfully : config.exploitFailed;
  console.log(result);
};

// Creates a new CookieJar instance with rejectPublicSuffixes set to false.
const createVulnerableJar = () => {
  return new tough.CookieJar(undefined, {rejectPublicSuffixes: config.rejectPublicSuffixes});
};

// Validates that a CookieJar and an array of cookie data are provided.
const validateJarAndCookies = (jar, cookieDataArray) => {
  if (!jar) {
    throw new Error("CookieJar instance is required.");
  }

  if (!cookieDataArray || !Array.isArray(cookieDataArray) || cookieDataArray.length === 0) {
    throw new Error("cookieDataArray must be a non-empty array.");
  }
};

module.exports = {
  setCookies,
  isCookiePolluted,
  createVulnerableJar
};
