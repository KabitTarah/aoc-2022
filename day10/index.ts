import * as fs from 'fs';
import { stringify } from 'querystring';
let input: Array<string> = fs.readFileSync('input', 'utf8').split('\n');

class Computer {
  X: number
  cycle: number
  pixels: Array<Array<string>> // Character arrays of length 40
  values: Map<number, number>

  constructor() {
    this.X = 1
    this.cycle = 0
    this.pixels = []
    for (let i: number = 0; i < 6; i++) {
      let dots: Array<string> = Array<string>(40).fill('.')
      this.pixels.push(dots)
    }
    this.values = new Map<number, number>
  }

  current_pixel() {
    let index: number = this.cycle - 1
    return [Math.floor(index/40), index % 40]
  }

  log() {
    this.values.set(this.cycle, this.X)
    //console.log(`${this.cycle}: [${this.current_pixel()} - ${this.X}]`)
    let coord: Array<number> = this.current_pixel()
    if (Math.abs(this.X - coord[1]) <= 1) {
      this.pixels[coord[0]][coord[1]] = '#'
    }
  }

  print() {
    let line: Array<string>
    for (line of this.pixels) {
      console.log(line.join(''))
    }
  }

  operation(opstring: string) {
    let op: Array<string> = opstring.split(' ')
    if (op.length == 2) {
      // move X
      this.cycle++
      this.log()
      this.cycle++
      this.log()
      this.X += parseInt(op[1])
    } else {
      this.cycle++;
      this.log()
    }
  }

  get(cycle: number) {
    return this.values.get(cycle)!
  }
}

console.log("\n\n***** PART 1 *****");
let cpu: Computer = new Computer()
let line: string
for (line of input) {
  cpu.operation(line)
}
let output: number = 0
for (let cycle: number = 20; cycle <= 220; cycle += 40) {
  output += cpu.get(cycle) * cycle
}
console.log(output)

console.log("\n\n***** PART 2 *****");
cpu.print()