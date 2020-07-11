'use strict';
const fs = require('fs');
const csvFile = fs.readFileSync(__dirname + '/Transactions.csv');
const parseCsv = require('csv-parse/lib/sync');
const csv = parseCsv(csvFile);

const headers = csv.shift();

const data = {};

csv.forEach((tx) => {
  let currTx;
  const currTxObj = {};
  for (let i = tx.length - 1; i >= 0; i--) {
    const element = tx[i];
    if (i === tx.length - 1) {
      currTx = element;
      if (!data[currTx]) data[currTx] = [];
      continue;
    }

    currTxObj[headers[i]] = element;
  }
  data[currTx].push(currTxObj);
});

console.log(data);
