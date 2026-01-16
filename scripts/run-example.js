import { execSync } from 'child_process';

const script = process.argv[2] || 'knowledge';
const args = process.argv.slice(3);
execSync('npx tsx examples/' + script + '.ts ' + args.join(' '), { stdio: 'inherit' });