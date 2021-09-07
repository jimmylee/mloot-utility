const occurences = require("./data/occurences.json");
const probability = require("./data/probability.json");
const loot = require("./data/loot.json");
const fs = require("fs");

const log = (message) =>
  console.log(`\x1b[1m[  mloot-utility  ] \x1b[0m ${message}`);

function isEmptyString(str) {
  return !str || /^\s*$/.test(str);
}

const run = async () => {
  // Structure of the JSON output.
  const results = { ids: [], search: [] };

  // The minimum `amount` of parts that are rarer than the `occur` value.
  let countThreshold = Number(process.argv[2]);
  if (!countThreshold || countThreshold === NaN) {
    log("no valid threshold (integer) was provided, using 2");
    countThreshold = 2;
  }

  // The minimum `amount` of occurances you're willing to accept for each `part`
  // under the `countThreshold` check.
  let occur = Number(process.argv[3]);
  if (!occur || occur === NaN) {
    log("no valid occurance (integer) minimum was provided, using (1/13+)");
    occur = 13;
  }

  // The minimum amount of parts that contain `query`
  let partsThreshold = Number(process.argv[4]);
  if (!partsThreshold || partsThreshold === NaN) {
    log("no valid minimum number (integer) of parts was provided, using 1");
    partsThreshold = 3;
  }

  // The word you are looking for
  let query = process.argv[5] ? String(process.argv[5]) : null;
  if (isEmptyString(query)) {
    log("no query (string) was provided, using: Divine");
    query = `Divine`;
  }

  log(
    `\x1b[32mwill start the search for ${countThreshold}x (1/${occur}+) where at least ${partsThreshold}x has the word ${query}.\x1b[0m`
  );

  try {
    for (const each of loot) {
      const key = Object.keys(each);
      const item = each[key[0]];

      let count = 0;
      let parts = 0;

      const slots = Object.keys(item);

      for (const space of slots) {
        if (Number(occurences[item[space]]) <= occur) count++;
        if (item[space].includes(query)) parts++;
        item[space] = { name: item[space], amount: occurences[item[space]] };
      }

      if (count < countThreshold) continue;
      if (parts < partsThreshold) continue;

      item.id = key[0];

      if (probability[item.id]) {
        item.rank = probability[item.id].rarest;
        item.score = probability[item.id].score;
      }

      results.search.push(item);
      results.ids.push(item.id);
    }

    const filename = `./results/${query}-(found:${
      results.ids.length
    })-${partsThreshold}-times-and-${countThreshold}-occurances-(1of${occur})-items.json`;

    fs.writeFileSync(filename, JSON.stringify(results, null, " "), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    log(`\x1b[36m[ found ${results.ids.length} ]\x1b[0m output: ${filename}`);
  } catch (e) {
    log(`\x1b[31mSomething went wrong, read the README.md.\x1b[0m`);
  }
};

run();
