#!/usr/bin/env node --harmony-async-await

const fs = require('fs');
const exec = require('child_process').execSync;

const list = fs.readFileSync('100_best_list.txt', 'utf-8').split('\n');

main();

function main() {
  let results = [];

  list.forEach(movie => {

    try {
      const [whole, title, year] = /(.+) \((\d+)\)/.exec(movie);
      const result = exec(`subtitler "${whole}" -lang eng --download`);

      const parsed = result.toString()
        .split(process.cwd());

      const fileName = `${parsed[1].split('.srt')[0]}.srt`;

      results.push({year, title, fileName});
      console.log(`success: ${title}`);

    } catch (err) {
      console.log(`failed to download for: ${movie}`);
    }
  });

  fs.writeFileSync('result.json', JSON.stringify(results, null, 2));
}

