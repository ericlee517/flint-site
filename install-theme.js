#!/usr/bin/env node

/**
 * Hexo Theme Turbo Installation Script
 * Install hexo-postcss, TailwindCSS v4 and DaisyUI
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  white: '\x1b[37m'
};

function printBox(text, color = 'cyan') {
  const width = text.length + 4;
  const line = '─'.repeat(width);
  console.log(`${colors[color]}  ╭${line}╮${colors.reset}`);
  console.log(`${colors[color]}  │  ${text}  │${colors.reset}`);
  console.log(`${colors[color]}  ╰${line}╯${colors.reset}`);
}

function print(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  printBox('Theme Turbo Plugin Install', 'cyan');
  print('');
  print('This script will install:', 'yellow');
  print('  1. hexo-postcss', 'white');
  print('  2. TailwindCSS v4', 'white');
  print('  3. DaisyUI', 'white');
  print('');

  const confirmation = await new Promise((resolve) => {
    rl.question('Continue installation? (Y/N) ', (answer) => {
      resolve(answer.trim());
    });
  });

  if (confirmation.toLowerCase() !== 'y') {
    print('Installation cancelled.', 'red');
    rl.close();
    process.exit(1);
  }

  print('');
  print('Starting installation...', 'green');
  print('');

  // Check if in Hexo project root
  if (!fs.existsSync('_config.yml')) {
    print('Error: _config.yml not found. Please run this script in Hexo project root.', 'red');
    rl.close();
    process.exit(1);
  }

  // Install hexo-postcss
  print('Installing hexo-postcss...', 'cyan');
  if (!runCommand('npm install hexo-postcss')) {
    print('hexo-postcss installation failed!', 'red');
    rl.close();
    process.exit(1);
  }
  print('hexo-postcss installed successfully!', 'green');

  // Install TailwindCSS v4 and DaisyUI
  print('');
  print('Installing TailwindCSS v4 and DaisyUI...', 'cyan');
  if (!runCommand('npm install tailwindcss @tailwindcss/postcss daisyui')) {
    print('TailwindCSS v4 and DaisyUI installation failed!', 'red');
    rl.close();
    process.exit(1);
  }
  print('TailwindCSS v4 and DaisyUI installed successfully!', 'green');

  // Create .postcssrc.js file
  print('');
  print('Creating .postcssrc.js config file...', 'cyan');
  const postcssConfig = `module.exports = {
    from: undefined,
    plugins: {
        "@tailwindcss/postcss": {},
    }
}`;
  fs.writeFileSync('.postcssrc.js', postcssConfig, 'utf8');
  print('.postcssrc.js config file created successfully!', 'green');

  // Check if theme directory exists
  const themePath = path.join('themes', 'flint');
  if (!fs.existsSync(themePath)) {
    print('');
    print('Warning: themes/flint directory not found. Please create main.css manually.', 'yellow');
    print('Location: themes/flint/source/css/main.css', 'yellow');
    print('Content:', 'yellow');
    print('@import "tailwindcss";', 'yellow');
    print('@plugin "daisyui" {', 'yellow');
    print('    themes: black --default;', 'yellow');
    print('}', 'yellow');
  } else {
    // Create main.css file
    const cssPath = path.join(themePath, 'source', 'css');
    if (!fs.existsSync(cssPath)) {
      fs.mkdirSync(cssPath, { recursive: true });
    }

    const mainCssContent = `@import "tailwindcss";
@plugin "daisyui" {
    themes: black --default;
}`;
    fs.writeFileSync(path.join(cssPath, 'main.css'), mainCssContent, 'utf8');
    print('main.css file created successfully!', 'green');
  }

  print('');
  printBox('Installation Complete!', 'green');
  print('');
  print('Successfully installed:', 'green');
  print('  [OK] hexo-postcss', 'green');
  print('  [OK] TailwindCSS v4', 'green');
  print('  [OK] DaisyUI', 'green');
  print('');
  print('Config files created:', 'green');
  print('  [OK] .postcssrc.js', 'green');
  print('  [OK] themes/flint/source/css/main.css', 'green');
  print('');
  print('You can now run:', 'yellow');
  print('  npm run build    # Build project', 'white');
  print('  npm run server   # Start server', 'white');
  print('');

  rl.close();
}

main();
