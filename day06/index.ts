import * as fs from 'fs';
let input: Array<string> = fs.readFileSync('input', 'utf8').split('\n');

class PacketReader {
  stream: string
  start: number
  
  constructor(stream: string) {
    this.stream = stream
    this.start = this.get_start(4)
  }

  get_start(count: number) {
    let i: number = 0
    while (i < this.stream.length - count) {
      let s: Set<string> = new Set(this.stream.substring(i, i+count).split(''))
      if (Array.from(s.values()).length == count) {
        return i+count; // after the start sequence
      }
      i++
    }
    return Number.MAX_VALUE
  }

}

console.log("\n\n***** PART 1 *****");
let packet: PacketReader = new PacketReader(input[0])
console.log(packet.start)

console.log("\n\n***** PART 2 *****");
console.log(packet.get_start(14))