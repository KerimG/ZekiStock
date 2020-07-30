const fs = require('fs');
const parseCsv = require('csv-parse/lib/sync');

function convertCsvToObject(path) {
  let csv;
  try {
    const csvFile = fs.readFileSync(path);
    csv = parseCsv(csvFile);
  } catch (error) {
    console.error(error);
    return {};
  }

  const data = {};
  const headers = [
    'date',
    'time',
    'product',
    'isin',
    'market',
    'count',
    'quoteCurrency',
    'quote',
    'localCurrency',
    'quoteInLocalCurrsency',
    'valueCurrency',
    'value',
    'exchangeRate',
    'feeCurrency',
    'fee',
    'totalCurrency',
    'total',
    'transactionId',
  ];

  // get rid of header line
  csv.shift();

  for (let i = 0; i < csv.length; i++) {
    const transactionArray = csv[i];
    const transactionObject = {};
    const lastElement = transactionArray.length - 1;
    const orderId = transactionArray[lastElement];

    // creating property with order-id as key and an array as value,
    // because an order can have multiple partial transactions
    if (!data[orderId]) data[orderId] = [];

    // iterating backwards
    for (let j = 0; j <= lastElement; j++) {
      if (j === lastElement) {
        // skip order-id column
        continue;
      }
      transactionObject[headers[j]] = transactionArray[j];
    }
    data[orderId].push(transactionObject);
  }

  return data;
}

function writeCsvToDb(csv) {
  const data = convertCsvToObject(csv);
  writeTransactionsToDb(data);
}

async function writeTransactionsToDb(transactions) {
  const { TransactionId, Transaction } = require('../models');

  for (const transactionId in transactions) {
    try {
      const tId = await TransactionId.findOne({
        where: {
          transactionId,
        },
      });

      if (tId === null) {
        await TransactionId.create({ transactionId });
        transactions[transactionId].forEach((tx) => {
          Transaction.create({
            transactionId,
            date: new Date(
              tx.date.split('-').reverse().join('-') + ' ' + tx.time
            ),
            product: tx.product,
            isin: tx.isin,
            market: tx.market,
            count: tx.count,
            quoteCurrency: tx.quoteCurrency,
            quote: tx.quote,
            localCurrency: tx.localCurrency,
            quoteInLocalCurrsency: tx.quoteInLocalCurrsency,
            valueCurrency: tx.valueCurrency,
            value: tx.value,
            exchangeRate: tx.exchangeRate,
            feeCurrency: tx.feeCurrency,
            fee: tx.fee,
            totalCurrency: tx.totalCurrency,
            total: tx.total,
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = {
  convertCsvToObject,
  writeCsvToDb,
  writeTransactionsToDb,
};
