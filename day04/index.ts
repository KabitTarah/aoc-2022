import * as fs from 'fs';
let input: Array<string> = fs.readFileSync('input', 'utf8').split('\n');

class Pair {
  elf1: Array<number> = [0, 0]
  elf2: Array<number> = [0, 0]
  
  constructor(ranges: string) {
    let range: Array<string> = ranges.split(',')
    let elf1: Array<string> = range[0].split('-')
    let elf2: Array<string> = range[1].split('-')
    this.elf1[0] = parseInt(elf1[0])
    this.elf1[1] = parseInt(elf1[1])
    this.elf2[0] = parseInt(elf2[0])
    this.elf2[1] = parseInt(elf2[1])
  }

  is_contained() {
    let A: Array<number>
    let B: Array<number>
    if (this.elf1[1]-this.elf1[0] > this.elf2[1]-this.elf2[0]) {
      A = this.elf1
      B = this.elf2
    } else {
      A = this.elf2
      B = this.elf1
    }
    if ((B[0] >= A[0]) && (B[1] <= A[1])) return true; else return false;
  }

  overlaps() {
    if ((this.elf1[0] >= this.elf2[0]) && (this.elf1[0] <= this.elf2[1])) return true;
    if ((this.elf1[1] >= this.elf2[0]) && (this.elf1[0] <= this.elf2[1])) return true;
    return false
  }
}

let pairs: Array<Pair> = [];

console.log("\n\n***** PART 1 *****");
let pair: Pair
let line: string
let count: number = 0
for (line of input) {
  pair = new Pair(line)
  if (pair.is_contained()) count++;
  pairs.push(pair)
}
console.log(count)

count = 0
console.log("\n\n***** PART 2 *****");
for (pair of pairs) {
  if (pair.overlaps()) count++;
}
console.log(count)