#!/usr/bin/env node --harmony-async-await

const Promise = require('bluebird');
const Parser = require("subtitles-parser");
const elasticsearch = require('elasticsearch');
const fs = require('fs');

const path = process.argv[2];
const movieTitle = process.argv[3];
const movieYear = process.argv[4];


main()
  .catch(e => console.error(e));

async function main() {
  const startDate = new Date().getTime();

  const data = await Promise.promisify(fs.readFile)(path, 'utf-8');
  const parsed = Parser.fromSrt(data);
  const bulkPrepared = buildBulk(parsed);

  const client = elasticsearch.Client({
    host: 'localhost:9200',
  });

  await client.bulk(bulkPrepared);

  const duration = new Date().getTime() - startDate;
  console.log(`Finished successfully after: ${duration} milliseconds. Indexed ${parsed.length} docs`);

}

function buildBulk(parsedData) {
  let bulk = {
    body: []
  };

  parsedData.forEach(entry => {
    bulk.body.push({
      index: {
        _index: 'subs', _type: 'line'
      }
    });

    bulk.body.push({
      text: entry.text.replace(/\n/, ' '),
      startTime: entry.startTime,
      endTime: entry.endTime,
      movie: movieTitle,
      year: movieYear,
    });
  });

  return bulk;
}



