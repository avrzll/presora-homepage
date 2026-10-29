const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
let errors = 0;
let passed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    errors++;
  }
}

console.log('--- Starting Validation for Presora Website ---\n');

// 1. Check Required Files Exist
const requiredFiles = [
  'index.html',
  'privacy/index.html',
  'privacy.html',
  'terms/index.html',
  'terms.html',
  'contact/index.html',
  'contact.html',
  '404.html',
  '_headers',
  '_redirects',
  'robots.txt',
  'sitemap.xml',
  'site.config.json',
  'assets/css/style.css',
  'assets/js/config.js',
  'assets/js/main.js',
  'assets/images/splash_logo.png',
  'assets/images/launcher_logo.png',
  'assets/images/favicon.png'
];

requiredFiles.forEach(file => {
  const fullPath = path.join(rootDir, file);
  assert(fs.existsSync(fullPath), `File exists: ${file}`);
});

// 2. Validate JSON Configuration
try {
  const configJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'site.config.json'), 'utf8'));
  assert(configJson.appName === 'Presora', 'site.config.json appName is Presora');
  assert(configJson.developer && configJson.developer.supportEmail.includes('@'), 'Valid developer email in config');
  assert(configJson.urls && configJson.urls.domain.startsWith('https://'), 'Valid HTTPS domain placeholder in config');
} catch (e) {
  assert(false, `site.config.json parsing error: ${e.message}`);
}

// 3. Validate Google OAuth Verification Requirements in Privacy Policy
const privacyContent = fs.readFileSync(path.join(rootDir, 'privacy', 'index.html'), 'utf8');
assert(privacyContent.includes('Google API Services User Data Policy'), 'Privacy policy cites Google API Services User Data Policy');
assert(privacyContent.includes('Limited Use'), 'Privacy policy cites Limited Use requirements');
assert(privacyContent.includes('https://www.googleapis.com/auth/spreadsheets'), 'Privacy policy covers Google Sheets scope');
assert(privacyContent.includes('https://www.googleapis.com/auth/drive.file'), 'Privacy policy covers Google Drive file scope');
assert(privacyContent.includes('https://www.googleapis.com/auth/drive.readonly'), 'Privacy policy covers Google Drive readonly scope');
assert(privacyContent.includes('SharedPreferences'), 'Privacy policy truthfully explains token storage');
assert(privacyContent.includes('avrizalrendiprayoga@gmail.com'), 'Privacy policy contains developer contact email');
assert(privacyContent.includes('myaccount.google.com/permissions'), 'Privacy policy explains permission revocation');

// 4. Validate Terms of Service Requirements
const termsContent = fs.readFileSync(path.join(rootDir, 'terms', 'index.html'), 'utf8');
assert(termsContent.includes('Presora'), 'Terms covers Presora');
assert(termsContent.includes('izin') || termsContent.includes('persetujuan'), 'Terms requires participant consent/permission');
assert(termsContent.includes('Google Sheets') || termsContent.includes('Google Drive'), 'Terms acknowledges reliance on Google APIs');
assert(termsContent.includes('Batasan Tanggung Jawab'), 'Terms includes limitation of liability');

// 5. Validate Homepage
const indexContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
assert(indexContent.includes('Attendance, Organized.'), 'Homepage contains official tagline');
assert(indexContent.includes('/privacy/'), 'Homepage links to Privacy Policy');
assert(indexContent.includes('/terms/'), 'Homepage links to Terms of Service');
assert(indexContent.includes('/contact/'), 'Homepage links to Contact');
assert(!indexContent.includes('Sign in with Google</button>'), 'No fake Google sign-in button on public website');

console.log(`\nValidation complete: ${passed} checks passed, ${errors} errors.`);
if (errors > 0) {
  process.exit(1);
}
