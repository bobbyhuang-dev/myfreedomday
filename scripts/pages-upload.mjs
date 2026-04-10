import { spawnSync } from 'node:child_process';

const extraArgs = process.argv.slice(2);
const run = (args) =>
	spawnSync('wrangler', args, {
		stdio: 'inherit',
		shell: process.platform === 'win32',
	});

if (process.env.CF_PAGES === '1') {
	console.log(
		'CF_PAGES=1 detected. Cloudflare Pages will publish the built dist/ directory after a successful build, so no extra upload step is needed.',
	);
	process.exit(0);
}

if (process.env.WORKERS_CI === '1') {
	const result = run(['deploy', ...extraArgs]);
	process.exit(result.status ?? 1);
}

const projectName = process.env.CLOUDFLARE_PAGES_PROJECT_NAME ?? 'myfreedomday';
const branch = process.env.CF_PAGES_BRANCH ?? process.env.WORKERS_CI_BRANCH;
const args = ['pages', 'deploy', 'dist', '--project-name', projectName];

if (branch) {
	args.push('--branch', branch);
}

args.push(...extraArgs);

const result = run(args);
process.exit(result.status ?? 1);
