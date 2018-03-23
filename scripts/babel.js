#!/usr/bin/env node
const path = require('path');
const childProcess = require('child_process');

const cwd = process.cwd();
const babelBin = path.resolve(__dirname, '../node_modules/.bin/babel');
const srcDir = path.resolve(cwd, './src');
const libDir = path.resolve(cwd, './lib');

process.env.NODE_PATH = path.resolve(cwd, './node_modules');
process.env.BABEL_ENV = 'build';

const task = childProcess.spawnSync(
  babelBin,
  [srcDir, '--out-dir', libDir],
  { stdio: ['inherit', 'inherit', 'inherit'] }
);

process.exit(task.status);
