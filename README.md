# mloot-utility

<img width="1090" alt="stuff" src="https://user-images.githubusercontent.com/310223/132393231-847e8bce-c592-4ef6-9bfc-4ddb9f5c29c9.png">

Find more loot and discover interesting patterns.

```sh
npm install
npm install -g ts-node
npm run start
```

To perform a custom search

- number of items that must meet occurance requirements
- maximum occurance for each item
- number of items that must meet string matching requirements
- the string (case sensitive)

```
npm run start 2 13 3 Divine
```

- at least 2 items that has an occurance of 13 or less.
- at least 3 items that have the string `Divine`.

```
npm run start 1 100000 3 Kraken
```

- at least 1 item that has an occurance of 100000 or less.
- at least 3 items that have the string `Kraken`.

Output is in `./results`

## How do I check the loot?

- I used data dumps from https://github.com/Anish-Agnihotri/dhof-loot/tree/master/derivatives/temporal-loot
- I like using this site https://admiring-lumiere-a0df27.netlify.app/#/1229981

## How do I claim something interesting?

- https://etherscan.io/address/0x1dfe7Ca09e99d10835Bf73044a23B73Fc20623DF#writeContract
