const occurences = require("./data/occurences.json");
const probability = require("./data/probability.json");
const loot = require("./data/loot.json");
const fs = require("fs");

const run = async () => {
  // Structure of the JSON output.
  const results = { ids: [], search: [] };

  // Number of items that must be above the occurance value
  let countThreshold = Number(process.argv[2]);
  if (!process.argv[2]) {
    console.log("[ mloot-utility ] no threshold was provided, using 2");
    countThreshold = 2;
  }

  // Occurance minimum
  let occur = Number(process.argv[3]);
  if (!process.argv[3]) {
    console.log(
      "[ mloot-utility ] no occurance minimum was provided, using (1/13+)"
    );
    occur = 13;
  }

  // Number of parts that contain the word
  let partsThreshold = Number(process.argv[4]);
  if (!process.argv[4]) {
    console.log(
      "[ mloot-utility ] no minimum number of parts was provided, using 1"
    );
    partsThreshold = 3;
  }

  // The word you are looking for
  let query = String(process.argv[5]);
  if (!process.argv[5]) {
    console.log("[ mloot-utility ] no query was provided, using: Divine");
    query = `Divine`;
  }

  for (const each of loot) {
    const key = Object.keys(each);
    const item = each[key[0]];
    item.id = key[0];

    if (probability[item.id]) {
      item.rank = probability[item.id].rarest;
      item.score = probability[item.id].score;
    }

    let count = 0;
    let parts = 0;

    if (Number(occurences[item.waist]) <= occur) count++;
    if (item.waist.includes(query)) parts++;
    item.waist = { name: item.waist, amount: occurences[item.waist] };

    if (Number(occurences[item.weapon]) <= occur) count++;
    if (item.weapon.includes(query)) parts++;
    item.weapon = { name: item.weapon, amount: occurences[item.weapon] };

    if (Number(occurences[item.chest]) <= occur) count++;
    if (item.chest.includes(query)) parts++;
    item.chest = { name: item.chest, amount: occurences[item.chest] };

    if (Number(occurences[item.foot]) <= occur) count++;
    if (item.foot.includes(query)) parts++;
    item.foot = { name: item.foot, amount: occurences[item.foot] };

    if (Number(occurences[item.hand]) <= occur) count++;
    if (item.hand.includes(query)) parts++;
    item.hand = { name: item.hand, amount: occurences[item.hand] };

    if (Number(occurences[item.head]) <= occur) count++;
    if (item.head.includes(query)) parts++;
    item.head = { name: item.head, amount: occurences[item.head] };

    if (Number(occurences[item.neck]) <= occur) count++;
    if (item.neck.includes(query)) parts++;
    item.neck = { name: item.neck, amount: occurences[item.neck] };

    if (Number(occurences[item.ring]) <= occur) count++;
    if (item.ring.includes(query)) parts++;
    item.ring = { name: item.ring, amount: occurences[item.ring] };

    if (count < countThreshold) {
      continue;
    }

    if (parts < partsThreshold) {
      continue;
    }

    results.search.push(item);
    results.ids.push(item.id);
  }

  const filename = `./results/${query}-${partsThreshold}-times-and-${countThreshold}-occurances-(1of${occur})-items.json`;

  fs.writeFileSync(filename, JSON.stringify(results, null, " "), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  console.log(filename);
};

run();
