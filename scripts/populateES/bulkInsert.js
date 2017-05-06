#!/usr/bin/env node --harmony-async-await
const fs = require('fs');
const exec = require('child_process').execFileSync;

const elasticHost = process.argv[2];

const rawList = fs.readFileSync('./result.json');

const parsed = JSON.parse(rawList);
console.log(`will use ${elasticHost}`);

parsed.forEach(({year, title, fileName}) => {
  exec('./populate.js', [elasticHost, `./${fileName}`, title, year])
});

