import { execSync } from 'child_process';
import { rmSync } from 'fs';
import { resolve, dirname } from 'path';

const scriptDir = dirname(new URL(import.meta.url).pathname);
const projectRoot = resolve(scriptDir, '..');

console.log(`Project root: ${projectRoot}\n`);

// Force remove node_modules with multiple strategies
const dirsToRemove = [
  'node_modules',
  '.next',
  'dist',
  'build'
];

for (const dir of dirsToRemove) {
  const fullPath = resolve(projectRoot, dir);
  console.log(`Attempting to remove ${dir}...`);
  try {
    rmSync(fullPath, { recursive: true, force: true, maxRetries: 3 });
    console.log(`✓ Successfully removed ${dir}`);
  } catch (err) {
    console.log(`⚠ ${dir} not found or already removed`);
  }
}

// Also try to remove lock files
const lockFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
for (const file of lockFiles) {
  const fullPath = resolve(projectRoot, file);
  console.log(`Attempting to remove ${file}...`);
  try {
    rmSync(fullPath, { force: true });
    console.log(`✓ Successfully removed ${file}`);
  } catch (err) {
    console.log(`⚠ ${file} not found`);
  }
}

console.log('\n📦 Running npm install...\n');
try {
  execSync('npm install --legacy-peer-deps', { 
    stdio: 'inherit',
    cwd: projectRoot,
    timeout: 300000
  });
  console.log('\n✅ Dependencies installed successfully!');
} catch (err) {
  console.error('\n❌ npm install failed:', err.message);
  process.exit(1);
}
