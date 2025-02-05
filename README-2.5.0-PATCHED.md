# Seal Security – Tough-Cookie 2.5.0 Patch & Exploit Demo

## Overview

This project is my solution for the Seal Security home assignment.

It addresses a critical vulnerability ([**CVE-2023-26136**](https://nvd.nist.gov/vuln/detail/CVE-2023-26136)) in ([**tough-cookie 2.5.0**](https://github.com/salesforce/tough-cookie/tree/v2.5.0)).

The vulnerability allows `prototype pollution` by setting cookies with the domain `__proto__`, potentially leading to
denial-of-service or remote code execution.

Instead of upgrading to `tough-cookie 4.1.3` which would require client-side code modifications this solution customizes
`version 2.5.0` to mitigate the vulnerability while preserving the public API.

The deliverables include:

- **Patched version of tough-cookie 2.5.0** (packed as `tough-cookie-2.5.0-PATCHED.tgz`) that prevents prototype
  pollution by initializing its internal store with `Object.create(null)`.


- **changes.diff file** that documents only the intentional modifications relative to the official `tough-cookie 2.5.0`
  release.


- **Exploit script (`index.js`)** which:
  - Outputs **"EXPLOITED SUCCESSFULLY"** when run with the vulnerable package.
  - Outputs **"EXPLOIT FAILED"** when run with the patched package.


- **A unit test (`cookie_jar_test.js`)** verifying that the vulnerability is fixed.


- **Documentation of my CI/CD tool experience** (provided separately).

## How to Run the project

There are three options to run this project:

<details>
<summary>1. Pull from My GitHub Branch</summary>

1. **Clone the repository:**
   ```bash
   git clone https://github.com/reefgb96/tough-cookie-2.5.0-PATCH.git
   ```
2. **Checkout the patched branch/tag:**
    ```bash
    git checkout v2.5.0-PATCHED
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Run the exploit script:**

   (Vulnerable behavior - will log "EXPLOITED SUCCESSFULLY")
    ```bash
    npm install tough-cookie@2.5.0 && node index.js
    ```
   (Patched behavior - will log "EXPLOITED FAILED")
    ```bash
    npm install tough-cookie-2.5.0-PATCHED.tgz && node index.js
    ```

</details>

<details>
<summary>2. Unzip from Shared Drive</summary>

1. Download and unzip the project archive from the shared drive.
2. Open a terminal in the project directory.
3. Follow the same instructions as in Option 1 to run tests and the exploit script.

</details>

<details>
<summary>3. Install the Patched TGZ File Directly</summary>

1. Install the patched package:
    ```bash
    npm install tough-cookie-2.5.0-PATCHED.tgz
    ```

2. Run the exploit:
    ```bash
    node index.js
    ```

</details>


## Expectations & Results

#### Vulnerable Behavior:
When using the original package ([tough-cookie@2.5.0](https://github.com/salesforce/tough-cookie/tree/v2.5.0)), the exploit script demonstrates prototype pollution by outputting **"EXPLOITED SUCCESSFULLY"**.
</br>
This confirms that cookies with a domain of `__proto__` can alter `Object.prototype`.

#### Patched Behavior:
With the patched package, prototype pollution is mitigated—no malicious property is inherited—and the script outputs **"EXPLOIT FAILED"**. The patch ensures that internal cookie storage is safely initialized using `Object.create(null)`.

#### Unit Test:
A dedicated test in `cookie_jar_test.js` confirms that setting a cookie with the domain `__proto__` does not result in pollution of `Object.prototype`.

#### Test Suite:
All tests pass with the patched version, and the `changes.diff` file shows only the intended modifications relative to the official `tough-cookie 2.5.0` release.


## Summary
This project provides a secure, production-ready solution for patching a critical vulnerability in `tough-cookie 2.5.0`. By preventing `prototype pollution` while preserving the package’s public API, this patch enables Penguin Software Inc.
to continue using their existing Node.js application without changes. The deliverables include:

 - Patched tough-cookie 2.5.0 package in TGZ format.
 - diff file (changes.diff) with only the intended changes.
 - Exploit script (index.js) that clearly demonstrates the vulnerability in the original package and its mitigation in the patched version.
 - Unit tests verifying that the vulnerability is fixed.
