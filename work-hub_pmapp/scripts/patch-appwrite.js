const fs = require('fs');
const path = require('path');

function patchFile(filePath, targetStr, replacementStr) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(targetStr)) {
      content = content.replace(targetStr, replacementStr);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[patch-appwrite] Successfully patched ${filePath}`);
    } else {
      console.log(`[patch-appwrite] Target string not found or already patched in ${filePath}`);
    }
  } else {
    console.log(`[patch-appwrite] File not found: ${filePath}`);
  }
}

const mjsPath = path.join(__dirname, '..', 'node_modules', 'node-appwrite', 'dist', 'client.mjs');
const jsPath = path.join(__dirname, '..', 'node_modules', 'node-appwrite', 'dist', 'client.js');

patchFile(
  mjsPath,
  '...createAgent(this.config.endpoint, { rejectUnauthorized: !this.config.selfSigned })',
  '...(this.config.selfSigned ? createAgent(this.config.endpoint, { rejectUnauthorized: false }) : {})'
);

patchFile(
  jsPath,
  '...agent.createAgent(this.config.endpoint, { rejectUnauthorized: !this.config.selfSigned })',
  '...(this.config.selfSigned ? agent.createAgent(this.config.endpoint, { rejectUnauthorized: false }) : {})'
);
