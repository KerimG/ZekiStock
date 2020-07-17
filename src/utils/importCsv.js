const fs = require('fs');
const parseCsv = require('csv-parse/lib/sync');

function convertCsvToObject(path) {
  const csvFile = fs.readFileSync(path);
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
  return data;
}

function writeCsvToDb(csv) {
  const data = convertCsvToObject(csv);
  writeTransactionsToDb(data);
}

async function writeTransactionsToDb(transactions) {
  const { TransactionId, Transaction } = require('./models');

  for (const transactionId in transactions) {
    try {
      const tId = await TransactionId.findOne({
        where: {
          transactionId,
        },
      });

      if (tId === null) {
        await TransactionId.create({ transactionId });

        transactions[transactionId].forEach(async (tx) => {
          await Transaction.create({
            transctionId: transactionId,
            date: tx.Datum,
            product: tx.Produkt,
            isin: tx.ISIN,
            market: tx['Börse'],
            amount: tx.Anzahl,
            quoteCurrency: tx['KursWährung'],
            quote: tx.Kurs,
            localCurrency: tx['Lokalwährung'],
            quoteInLocalCurrsency: tx['Wert in Lokalwährun'],
            valueCurrency: tx['Wertwährung'],
            value: tx.Wert,
            fx: tx.Wechselkurs,
            feeCurrency: tx['Gebührwährung'],
            fee: tx['Gebühr'],
            totalCurrency: tx['Gesamtwährung'],
            total: tx.Gesamt,
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
