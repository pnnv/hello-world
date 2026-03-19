import { execSync } from 'child_process';
import { rmSync, existsSync } from 'fs';
import { resolve } from 'path';

const projectRoot = resolve(import.meta.url, '../../');

console.log('🧹 Removing node_modules, .next, and lock files...');
try {
  if (existsSync(`${projectRoot}/node_modules`)) {
    rmSync(`${projectRoot}/node_modules`, { recursive: true, force: true });
    console.log('✓ Removed node_modules');
  }
  if (existsSync(`${projectRoot}/.next`)) {
    rmSync(`${projectRoot}/.next`, { recursive: true, force: true });
    console.log('✓ Removed .next');
  }
  if (existsSync(`${projectRoot}/package-lock.json`)) {
    rmSync(`${projectRoot}/package-lock.json`, { force: true });
    console.log('✓ Removed package-lock.json');
  }
} catch (err) {
  console.error('Error during cleanup:', err.message);
}

console.log('\n📦 Installing dependencies fresh...');
try {
  execSync('npm install', { stdio: 'inherit', cwd: projectRoot });
  console.log('\n✅ Clean install complete!');
} catch (err) {
  console.error('Error during installation:', err.message);
  process.exit(1);
}
