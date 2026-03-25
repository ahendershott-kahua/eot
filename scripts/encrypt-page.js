/**
 * encrypt-page.js
 *
 * Takes an HTML file and a password, produces a password-protected HTML file.
 * Uses AES-256-GCM with PBKDF2 key derivation.
 * The password is NEVER stored — only the encrypted ciphertext, salt, and IV.
 *
 * Usage:
 *   node scripts/encrypt-page.js <input.html> <output.html> <password>
 *
 * To remove protection, just revert to the unencrypted source file.
 */

const fs = require('fs');
const crypto = require('crypto');

const [,, inputFile, outputFile, password] = process.argv;

if (!inputFile || !outputFile || !password) {
  console.error('Usage: node scripts/encrypt-page.js <input.html> <output.html> <password>');
  process.exit(1);
}

// Read the source HTML
const plaintext = fs.readFileSync(inputFile, 'utf8');

// Generate random salt and IV
const salt = crypto.randomBytes(32);
const iv = crypto.randomBytes(12);

// Derive key using PBKDF2 (same params as Web Crypto will use on the client)
const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

// Encrypt with AES-256-GCM
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
let encrypted = cipher.update(plaintext, 'utf8');
encrypted = Buffer.concat([encrypted, cipher.final()]);
const authTag = cipher.getAuthTag();

// Combine ciphertext + authTag (Web Crypto expects them concatenated)
const combined = Buffer.concat([encrypted, authTag]);

// Base64 encode everything
const saltB64 = salt.toString('base64');
const ivB64 = iv.toString('base64');
const dataB64 = combined.toString('base64');

// Build the password-gate HTML
const gateHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pod Execution Model</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: #1a1a1a;
  }
  .gate {
    text-align: center;
    max-width: 360px;
    padding: 40px;
  }
  .gate h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }
  .gate p {
    font-size: 13px;
    color: #888;
    margin-bottom: 32px;
  }
  .input-group {
    position: relative;
    margin-bottom: 16px;
  }
  .input-group input {
    width: 100%;
    padding: 14px 16px;
    font-size: 15px;
    border: 1.5px solid #ddd;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.2s;
    font-family: inherit;
  }
  .input-group input:focus {
    border-color: #00809B;
  }
  .input-group input.error {
    border-color: #e9001f;
    animation: shake 0.4s ease;
  }
  button {
    width: 100%;
    padding: 14px;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    background: #1a1a1a;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    font-family: inherit;
  }
  button:hover { background: #333; }
  button:active { transform: scale(0.98); }
  .error-msg {
    font-size: 12px;
    color: #e9001f;
    margin-top: 12px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .error-msg.visible { opacity: 1; }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
  }
  .brand {
    margin-bottom: 24px;
  }
  .brand svg { opacity: 0.15; }
</style>
</head>
<body>
<div class="gate">
  <div class="brand">
    <svg width="40" height="36" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
      <g><circle cx="50" cy="44" r="30" fill="none" stroke="#1a1a1a" stroke-width="3"/></g>
      <g><circle cx="90" cy="44" r="30" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-dasharray="4 3"/></g>
      <g><circle cx="70" cy="74" r="30" fill="none" stroke="#1a1a1a" stroke-width="3"/></g>
      <circle cx="70" cy="52" r="5" fill="#1a1a1a"/>
    </svg>
  </div>
  <h1>Pod Execution Model</h1>
  <p>Enter the password to continue</p>
  <form id="gate-form" onsubmit="return tryDecrypt(event)">
    <div class="input-group">
      <input type="password" id="pw" placeholder="Password" autocomplete="off" autofocus>
    </div>
    <button type="submit">Continue</button>
  </form>
  <div class="error-msg" id="err">Incorrect password</div>
</div>

<script>
const SALT = '${saltB64}';
const IV = '${ivB64}';
const DATA = '${dataB64}';

function b64ToArr(b64) {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

async function tryDecrypt(e) {
  e.preventDefault();
  const pw = document.getElementById('pw').value;
  if (!pw) return false;

  try {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw', enc.encode(pw), 'PBKDF2', false, ['deriveKey']
    );
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: b64ToArr(SALT), iterations: 100000, hash: 'SHA-256' },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: b64ToArr(IV) },
      key,
      b64ToArr(DATA)
    );
    const html = new TextDecoder().decode(decrypted);
    document.open();
    document.write(html);
    document.close();
  } catch (err) {
    const input = document.getElementById('pw');
    const errEl = document.getElementById('err');
    input.classList.add('error');
    errEl.classList.add('visible');
    setTimeout(() => { input.classList.remove('error'); }, 400);
    setTimeout(() => { errEl.classList.remove('visible'); }, 2000);
  }
  return false;
}
</script>
</body>
</html>`;

fs.writeFileSync(outputFile, gateHTML, 'utf8');
const sizeMB = (Buffer.byteLength(gateHTML) / 1024 / 1024).toFixed(1);
console.log("✅ Encrypted " + inputFile + " → " + outputFile + " (" + sizeMB + "MB)");
console.log("   Password is NOT stored in the output file.");
console.log("   To remove protection: git checkout bd01313 -- pod-execution-model.html");
