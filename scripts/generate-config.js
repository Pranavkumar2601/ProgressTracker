const fs = require("fs");
const path = require("path");

// Load .env file
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const root = path.resolve(__dirname, "..");
const clientId = (process.env.GOOGLE_CLIENT_ID || "").trim();
const filePath = path.join(root, "config.js");

if (!clientId) {
  console.warn("⚠️  WARNING: GOOGLE_CLIENT_ID is not set in .env file.");
  console.warn("   Copy .env.example to .env and add your OAuth Client ID.");
}

const config = `window.APP_CONFIG = {
  googleClientId: ${JSON.stringify(clientId)},
};
`;

fs.writeFileSync(filePath, config, "utf8");
console.log(
  clientId
    ? "✓ config.js generated with GOOGLE_CLIENT_ID from .env"
    : "✗ config.js generated without GOOGLE_CLIENT_ID (app will work offline only)",
);
