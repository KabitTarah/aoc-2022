import * as fs from 'fs';
let input: Array<string> = fs.readFileSync('input', 'utf8').split('\n');

const strmap: string = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

class ElfGroup {
  elves: Array<Rucksack> = []
  tag: string

  constructor(A: Rucksack, B: Rucksack, C: Rucksack) {
    this.elves.push(A)
    this.elves.push(B)
    this.elves.push(C)
    this.tag = this.common_element()
  }

  common_element() {
    let A: Set<string> = new Set<string>(this.elves[0].items)
    let B: Set<string> = new Set<string>(this.elves[1].items)
    let C: Set<string> = new Set<string>(this.elves[2].items)
    let item: string
    for (item of A) {
      if (B.has(item) && C.has(item)) {
        return item
      }
    }
    return '_'
  }
}

class Rucksack {
  items: Array<string>
  compartment1: Array<string>
  compartment2: Array<string>
  
  constructor(contents: string) {
    this.items = contents.split('')
    this.compartment1 = this.items.slice(0, this.items.length/2)
    this.compartment2 = this.items.slice(this.items.length/2)
  }

  common_element() {
    let A: Set<string> = new Set<string>(this.compartment1)
    let B: Set<string> = new Set<string>(this.compartment2)
    let item: string
    for (item of A) {
      if (B.has(item)) {
        return strmap.indexOf(item)
      }
    }
    return 0 
  }
}

let rucksacks: Array<Rucksack> = [];

console.log("\n\n***** PART 1 *****");
let rucksack: Rucksack
let line: string
let total: number = 0
for (line of input) {
  rucksack = new Rucksack(line)
  total += rucksack.common_element()
  rucksacks.push(rucksack)
}
console.log(total)

console.log("\n\n***** PART 2 *****");
let elfGroups: Array<ElfGroup> = []
total = 0
for (let i: number = 0; i < rucksacks.length; i += 3) {
  let eg = new ElfGroup(rucksacks[i], rucksacks[i+1], rucksacks[i+2])
  total += strmap.indexOf(eg.tag)
  elfGroups.push(eg)
}
console.log(total)
