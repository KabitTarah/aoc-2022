import * as fs from 'fs';
import { stringify } from 'querystring';
let input: Array<string> = fs.readFileSync('input', 'utf8').split('\n');

const directions: Map<string, Array<number>> = new Map<string, Array<number>>([['L', [-1, 0]],
                                                                               ['R', [1, 0]],
                                                                               ['U', [0, 1]],
                                                                               ['D', [0, -1]]])

class Head {
  location: Array<number> = [0,0]
  id: number
  head: Head | null
  tail: Head | null
  visited: Map<number, Set<number>>
  
  constructor(parent: Head | null, id: number, id_max: number) {
    this.id = id
    this.head = parent
    if (this.id > id_max) this.tail = null; else this.tail = new Head(this, this.id + 1, id_max);
    this.visited = new Map<number, Set<number>>([[0, new Set<number>([0])]])
  }

  update_visited() {
    if (!this.visited.has(this.location[0])) {
      this.visited.set(this.location[0], new Set<number>())
    }
    this.visited.get(this.location[0])!.add(this.location[1])
  }

  move(direction: string, distance: number) {
    for (let i = 0; i < distance; i++) {
      this.location[0] += directions.get(direction)![0]
      this.location[1] += directions.get(direction)![1]
      if (this.tail != null) this.tail.follow(direction)
    }
    //console.log(`${direction} ${distance} now at [${this.location}]`)
  }
    
  follow(direction: string) {
    if (this.far_from_head()) {
      let dist: Array<number> = this.dist_from_head()
      if (dist[0] != 0)
        this.location[0] += dist[0] / (Math.abs(dist[0]));
      if (dist[1] != 0)
        this.location[1] += dist[1] / (Math.abs(dist[1]));
      this.update_visited()
      //console.log(`Tail ${this.id} moved to [${this.location}]`)
      if (this.tail != null) this.tail.follow(direction)
    }
  }

  far_from_head() {
    if (this.head === null) return false
    let x: number = Math.abs(this.location[0] - this.head.location[0])
    let y: number = Math.abs(this.location[1] - this.head.location[1])
    if ((Math.abs(this.location[0] - this.head.location[0]) <= 1) &&
        (Math.abs(this.location[1] - this.head.location[1]) <= 1)) return false
    return true
  }

  dist_from_head() {
    if (this.head === null) return [0, 0]
    let x: number = this.head.location[0] - this.location[0]
    let y: number = this.head.location[1] - this.location[1]
    return [x, y]
  }

  count(id: number) {
    let tail: Head = this
    while (tail.id != id) {
      tail = tail.tail!
    }
    let total: number = 0
    let val: Set<number>
    for (val of tail.visited.values()) {
      total += Array.from(val.values()).length
    }
    return total
  }
}

console.log("\n\n***** PART 1 *****");
let head: Head = new Head(null, 0, 9)
let line: string
for (line of input) {
  let split: Array<string> = line.split(' ')
  let direction: string = split[0]
  let distance: number = parseInt(split[1])
  head.move(direction, distance)
}
console.log(head.count(1))

console.log("\n\n***** PART 2 *****");
console.log(head.count(9))