import * as fs from 'fs';
let input: Array<string> = fs.readFileSync('input', 'utf8').split('\n');
class Elf {
  values: Array<number>;
  sum: number;
  
  constructor() {
    this.values = [];
    this.sum = 0;
  }
}
let elves: Array<Elf> = [];

console.log("\n\n***** PART 1 *****");
let elf: Elf = new Elf();
let biggestElf: Elf = new Elf();
let item: string;
for (item of input) {
    if (item.trim() === '') {
      elves.push(elf);
      if (elf.sum > biggestElf.sum) {
        biggestElf = elf;
      }
      elf = new Elf();
    } else {
      elf.values.push(parseInt(item));
      elf.sum += parseInt(item);
    }
}
console.log(biggestElf.sum);

console.log("\n\n***** PART 2 *****");
// Sort the Elves
elves.sort((n1, n2) => (n2.sum - n1.sum))
let sum: number = elves[0].sum + elves[1].sum + elves[2].sum
console.log(sum)