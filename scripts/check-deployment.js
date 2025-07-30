#!/usr/bin/env node

/**
 * AmoraVerse Deployment Status Check Script
 * Verify Vercel deployment success
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  // Get deployment URL from environment variables or default
  DEPLOY_URL: process.env.VERCEL_URL || process.env.DEPLOY_URL || 'https://your-app.vercel.app',
  TIMEOUT: 10000, // 10 second timeout
  RETRIES: 3
};

// Color output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });

    req.on('error', reject);
    req.setTimeout(CONFIG.TIMEOUT, () => req.destroy());
    req.end();
  });
}

async function checkEndpoint(url, description) {
  try {
    log(`🔍 Checking ${description}...`, 'blue');
    const response = await makeRequest(url);
    
    if (response.status === 200) {
      log(`✅ ${description} OK (${response.status})`, 'green');
      return true;
    } else {
      log(`⚠️  ${description} returned status ${response.status}`, 'yellow');
      return false;
    }
  } catch (error) {
    log(`❌ ${description} check failed: ${error.message}`, 'red');
    return false;
  }
}

async function checkDeployment() {
  log('🚀 AmoraVerse Deployment Status Check', 'bold');
  log('=' * 50);
  
  const results = {
    frontend: false,
    api: false,
    health: false,
    styles: false,
    tones: false
  };

  // Check frontend
  results.frontend = await checkEndpoint(
    CONFIG.DEPLOY_URL,
    'Frontend Application'
  );

  // Check API health status
  results.health = await checkEndpoint(
    `${CONFIG.DEPLOY_URL}/api/health`,
    'API Health Check'
  );

  // Check API endpoints
  results.api = await checkEndpoint(
    `${CONFIG.DEPLOY_URL}/api/styles`,
    'API Endpoints'
  );

  // Check styles endpoint
  results.styles = await checkEndpoint(
    `${CONFIG.DEPLOY_URL}/api/styles`,
    'Poetry Styles Endpoint'
  );

  // Check tones endpoint
  results.tones = await checkEndpoint(
    `${CONFIG.DEPLOY_URL}/api/tones`,
    'Emotional Tones Endpoint'
  );

  // Generate report
  log('\n📊 Deployment Status Report', 'bold');
  log('=' * 30);
  
  const totalChecks = Object.keys(results).length;
  const passedChecks = Object.values(results).filter(Boolean).length;
  
  Object.entries(results).forEach(([key, passed]) => {
    const status = passed ? '✅' : '❌';
    const color = passed ? 'green' : 'red';
    log(`${status} ${key}: ${passed ? 'PASS' : 'FAIL'}`, color);
  });

  log(`\n📈 Overall Result: ${passedChecks}/${totalChecks} checks passed`, 'bold');
  
  if (passedChecks === totalChecks) {
    log('🎉 Deployment successful! All checks passed.', 'green');
    log(`🌐 Your application is available at: ${CONFIG.DEPLOY_URL}`, 'green');
  } else {
    log('⚠️  Deployment may have issues, please check the following:', 'yellow');
    Object.entries(results).forEach(([key, passed]) => {
      if (!passed) {
        log(`   - ${key} endpoint not responding`, 'red');
      }
    });
  }

  // Provide suggestions
  log('\n💡 Suggestions:', 'blue');
  if (!results.frontend) {
    log('   - Check if frontend build was successful');
    log('   - Verify vercel.json configuration');
  }
  if (!results.api) {
    log('   - Check backend API deployment');
    log('   - Verify environment variable settings');
  }
  if (!results.health) {
    log('   - Check API server status');
    log('   - Verify Python dependencies installation');
  }

  return passedChecks === totalChecks;
}

// Main function
async function main() {
  try {
    const success = await checkDeployment();
    process.exit(success ? 0 : 1);
  } catch (error) {
    log(`❌ Error during check: ${error.message}`, 'red');
    process.exit(1);
  }
}

// If running this script directly
if (require.main === module) {
  main();
}

module.exports = { checkDeployment, CONFIG }; 