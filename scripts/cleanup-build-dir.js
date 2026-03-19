const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Target the actual build directory
const buildDir = '/vercel/share/v0-next-shadcn';

console.log(`🧹 Cleaning up ${buildDir}...\n`);

const dirsToRemove = ['node_modules', '.next', 'dist', 'build', '.turbo'];
const filesToRemove = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];

// Remove directories aggressively
for (const dir of dirsToRemove) {
  const dirPath = path.join(buildDir, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`Removing ${dir}...`);
    try {
      fs.rmSync(dirPath, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
      console.log(`✓ Removed ${dir}\n`);
    } catch (err) {
      console.error(`✗ Failed to remove ${dir}: ${err.message}\n`);
    }
  }
}

// Remove lock files
for (const file of filesToRemove) {
  const filePath = path.join(buildDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`Removing ${file}...`);
    try {
      fs.unlinkSync(filePath);
      console.log(`✓ Removed ${file}\n`);
    } catch (err) {
      console.error(`✗ Failed to remove ${file}: ${err.message}\n`);
    }
  }
}

// Clear npm cache
console.log('Clearing npm cache...');
try {
  execSync('npm cache clean --force');
  console.log('✓ Cleared npm cache\n');
} catch (err) {
  console.log('⚠ Could not clear npm cache (non-critical)\n');
}

// Install dependencies in the build directory
console.log(`📦 Running npm install in ${buildDir}...\n`);
try {
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit', cwd: buildDir });
  console.log('\n✓ Successfully installed dependencies!');
  process.exit(0);
} catch (err) {
  console.error('\n✗ npm install failed');
  console.error(err.message);
  process.exit(1);
}
