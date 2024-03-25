#!/usr/bin/env node
import fs from "fs";

const messageFile = process.argv[2];
const message = fs.readFileSync(messageFile, 'utf-8');
const maxLength = 72;
const lines = message.split('\n');
const alert = '[FAILED]';
const red = '\x1b[31m';
const yellow = '\x1b[33m';
const green = '\x1b[32m';
const resetColor = '\x1b[0m';

if (lines[0].length > maxLength) {
  console.log(`${red}${alert} ${yellow}Your commit message exceeds the maximum length of ${green}${maxLength}${yellow} characters. Its length is ${red}${message.length}${yellow} characters.${resetColor}`);
  process.exit(1);
}

if (lines.length > 1 && lines[1] !== '') {
  console.log(`${red}${alert} ${yellow}In the multiline commit message the second line have to be empty.${resetColor}`);
  process.exit(1);
}