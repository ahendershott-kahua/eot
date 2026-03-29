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
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    overflow: hidden;
  }
  
  /* SVG system grid background */
  .bg-graphic {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 0;
    mix-blend-mode: multiply;
  }

  @keyframes orbit1 {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes orbit2 {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }
  @keyframes orbit3 {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
  }

  .gate {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  form {
    position: relative;
  }

  .input-group input {
    width: 280px;
    padding: 18px 24px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    color: #ffffff;
    background: #1a1a1a;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    outline: none;
    transition: all 0.3s ease;
    font-family: inherit;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
  
  .input-group input::placeholder {
    color: rgba(255,255,255,0.3);
  }
  
  .input-group input:focus {
    background: #000000;
    border-color: #00D2D3;
    box-shadow: 0 0 0 4px rgba(0, 128, 155, 0.2);
  }
  
  .input-group input.error {
    background: #e9001f;
    border-color: transparent;
    animation: shake 0.4s ease;
  }

  .error-msg {
    position: absolute;
    bottom: -32px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #e9001f;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .error-msg.visible { opacity: 1; }
</style>
</head>
<body>

  <!-- The Animated System Graphic -->
  <svg class="bg-graphic" width="576" height="528" viewBox="0 0 420 380" xmlns="http://www.w3.org/2000/svg">
      <!-- Static System Grid Background -->
      <g style="opacity:0.35;">
          <circle cx="210" cy="190" r="240" fill="none" stroke="#1a1a1a" stroke-width="0.5" stroke-dasharray="4 8" />
          <circle cx="210" cy="190" r="180" fill="none" stroke="#1a1a1a" stroke-width="0.5" />
          <line x1="-30" y1="190" x2="450" y2="190" stroke="#1a1a1a" stroke-width="0.5" stroke-dasharray="2 6" />
          <line x1="210" y1="-50" x2="210" y2="430" stroke="#1a1a1a" stroke-width="0.5" stroke-dasharray="2 6" />
      </g>
      <!-- Primary Circle (Teal) -->
      <g style="transform-origin:210px 190px; animation:orbit1 40s linear infinite;">
          <circle cx="130" cy="140" r="110" fill="rgba(0,128,155,0.06)" stroke="#00809B" stroke-width="8" />
          <circle cx="130" cy="30" r="6" fill="#00809B" />
      </g>
      <!-- Secondary Circle (Red Dashed) -->
      <g style="transform-origin:210px 190px; animation:orbit2 45s linear infinite reverse;">
          <circle cx="290" cy="190" r="110" fill="rgba(233,0,31,0.03)" stroke="#e9001f" stroke-width="2" stroke-dasharray="6 4" />
          <circle cx="400" cy="190" r="4" fill="#e9001f" />
      </g>
      <!-- Tertiary Circle (Orange) -->
      <g style="transform-origin:210px 190px; animation:orbit3 50s linear infinite;">
          <circle cx="170" cy="270" r="110" fill="rgba(255,153,29,0.06)" stroke="#FF991D" stroke-width="4" />
          <circle cx="170" cy="380" r="5" fill="#FF991D" />
      </g>
  </svg>

  <div class="gate">
    <form id="gate-form" onsubmit="return tryDecrypt(event)">
      <div class="input-group">
        <input type="password" id="pw" placeholder="Enter Protocol" autocomplete="off" autofocus>
      </div>
      <button type="submit" style="display:none;"></button>
      <div class="error-msg" id="err">Access Denied</div>
    </form>
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
