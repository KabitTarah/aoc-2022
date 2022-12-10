import * as fs from 'fs';
import { stringify } from 'querystring';
let input: Array<string> = fs.readFileSync('input', 'utf8').split('\n');

class Supply {
  stacks: Array<Array<string>> = [[],[],[],[],[],[],[],[],[],[]]
  
  constructor() {
  }

  add(id: number, item: string) {
    this.stacks[id].push(item)
  }

  peek_all() {
    let outArray: Array<string> = []
    for (let i: number = 1; i < this.stacks.length; i++) {
      outArray.push(this.stacks[i].at(-1)!)
    }
    return outArray.join('')
  }

  move_one(from: number, to: number) {
    if (this.stacks[from].length > 0)
      this.stacks[to].push(this.stacks[from].pop()!)
  }

  move_n(count: number, from: number, to: number) {
    if (this.stacks[from].length < count) count = this.stacks[from].length
    let transfer: Array<string> = []
    for (let i: number = 0; i < count; i++) {
      transfer.push(this.stacks[from].pop()!)
    }
    let item: string
    for (let i: number = 0; i < count; i++) {
      this.stacks[to].push(transfer.pop()!)
    }
  }

  move(count: number, from: number, to: number) {
    for (let c = 0; c < count; c++) {
      this.move_one(from, to)
    }
  }

  copy() { // to preserve for part 2
    let supply: Supply = new Supply()
    for (let i: number = 0; i < this.stacks.length; i++) {
      supply.stacks[i] = this.stacks[i].slice()
    }
    return supply
  }

  print() {
    let stack: Array<string>
    for (stack of this.stacks) console.log(stack)
  }
}

let supply: Supply = new Supply()

console.log("\n\n***** PART 1 *****");
let supplyInput: Array<string> = []
let line: string = input.shift()!
while (line.trim() != '') {
  supplyInput.push(line)
  line = input.shift()!
}
supplyInput.pop() // get rid of stack index values
while (supplyInput.length > 0) {
  line = supplyInput.pop()!
  for (let i: number = 1; i <= 9; i++) {
    let index: number = (i-1)*4 + 1  // index in string starts at 1 and has 4 spaces between each 
    if (line[index] != ' ') {
      supply.add(i, line[index])
    }
  }
}
let supply2: Supply = supply.copy()
for (line of input) {
  let instruction: Array<string> = line.split(' ')
  let count: number = parseInt(instruction[1])
  let from: number = parseInt(instruction[3])
  let to: number = parseInt(instruction[5])
  supply.move(count, from, to)
}
//supply.print()
console.log(supply.peek_all())

console.log("\n\n***** PART 2 *****");
for (line of input) {
  let instruction: Array<string> = line.split(' ')
  let count: number = parseInt(instruction[1])
  let from: number = parseInt(instruction[3])
  let to: number = parseInt(instruction[5])
  supply2.move_n(count, from, to)
}
console.log(supply2.peek_all())
