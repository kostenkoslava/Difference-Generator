#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../index.js'
const program = new Command();
program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>',)
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .action(gendiff(filepath1, filepath2))

// must be before .parse()


program.parse(process.argv);