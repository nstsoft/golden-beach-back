import { build } from 'esbuild';
const config = {
  entryPoints: ['./src/server.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'build/main.cjs',
  sourcemap: true,
  target: 'node21',
  loader: {
    '.html': 'text', // Use a custom loader for HTML files
  },
  external: ['mock-aws-s3', '@mapbox'],
};

build(config).catch((err) => {
  console.error(err);
  process.exit(1);
});
