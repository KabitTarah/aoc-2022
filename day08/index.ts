import * as fs from 'fs';
import { stringify } from 'querystring';
let input: Array<string> = fs.readFileSync('input', 'utf8').split('\n');

class Tree {
  height: number
  visible: boolean
  trees: Map<string, Tree | null>
  
  constructor(height: number) {
    this.height = height
    this.visible = false
    this.trees = new Map<string, Tree | null>([['north', null],
                                               ['south', null],
                                               ['east', null],
                                               ['west', null]])
  }

  set_vis_dir(direction: string) {
    let max_height: number = this.height
    this.visible = true
    let next: Tree | null = this.trees.get(direction)!
    while (next != null) {
      if (next.height > max_height) {
        next.visible = true
        max_height = next.height
      }
      next = next.trees.get(direction)!
    }
  }

  count_vis_dir(direction: string) {
    let count: number = 0
    let next: Tree | null = this.trees.get(direction)!
    while (next != null) {
      count++
      if (next.height >= this.height) {
        next = null
      } else {
        next = next.trees.get(direction)!
      }
    }
    return count
  }
  
  get_scenic_score() {
    let item: Tree | null
    for (item of this.trees.values()) {
      if (item === null) return 0
    }
    return this.count_vis_dir('north') *
           this.count_vis_dir('west') *
           this.count_vis_dir('east') *
           this.count_vis_dir('south')
  }

  get_max_scenic_score_row() {
    let max_score: number = 0
    let current: Tree = this
    while (current != null) {
      let score: number = current.get_scenic_score()
      if (score > max_score) max_score = score
      current = current.trees.get('east')!
    }
    return max_score
  }

  get_max_scenic_score() {
    let max_score: number = 0
    let current: Tree = this
    while (current != null) {
      let score: number = current.get_max_scenic_score_row()
      if (score > max_score) max_score = score;
      current = current.trees.get('south')!
    }
    return max_score
  }

  is_visible_dir(direction: string) {
    let t: Tree = this.trees.get(direction)!
    while (t != null) {
      if (t.height > this.height) return false
      t = t.trees.get(direction)!
    }
    return true
  }

  count_row() {
    let current: Tree = this
    let count: number = 0
    while (current != null) {
      if (current.visible) count ++;
      current = current.trees.get('east')!
    }
    return count
  }

  count() {
    let current: Tree = this
    let count: number = 0
    while (current != null) {
      count += current.count_row()
      current = current.trees.get('south')!
    }
    return count
  }
  
  print_local() {
    let n: string = ' ';
    let w: string = ' ';
    let e: string = ' ';
    let s: string = ' ';
    if (this.trees.get('north') != null) 
      n = this.trees.get('north')!.height.toString();
    if (this.trees.get('west') != null)
      w = this.trees.get('west')!.height.toString();
    if (this.trees.get('east') != null)
      e = this.trees.get('east')!.height.toString();
    if (this.trees.get('south') != null)
      s = this.trees.get('south')!.height.toString();
    console.log(` ${n} `)
    console.log(`${w}${this.height.toString()}${e}`)
    console.log(` ${s} `)
  }
}

console.log("\n\n***** PART 1 *****");
let north_edge: Array<Tree> = []
let west_edge: Array<Tree> = []
let east_edge: Array<Tree> = []
let south_edge: Array<Tree> = []
let line: string
let uL: Tree | null = null
let row_last: Tree | null = null
let north: Tree | null = null
for (line of input) {
  let t: Tree = new Tree(parseInt(line[0]))
  west_edge.push(t)
  if (uL === null) {
    uL = t
  } else if (row_last === null) {
    row_last = uL
  } else row_last = row_last.trees.get('south')!
  if (row_last != null) {
    row_last.trees.set('south', t)
    t.trees.set('north', uL)
    north = row_last.trees.get('east')!
  }
  for (let i = 1; i < line.length; i++) {
    let prev: Tree = t
    t = new Tree(parseInt(line[i]))
    prev.trees.set('east', t)
    t.trees.set('west', prev)
    t.trees.set('north', north)
    if (north != null) {
      north.trees.set('south', t)
      north = north.trees.get('east')!
    }
    if (i == line.length - 1) east_edge.push(t)
  }
}
// get south edge
let current: Tree | null = row_last?.trees.get('south')!
while (current != null) {
  south_edge.push(current)
  current = current.trees.get('east')!
}
// get north edge
current = uL
while (current != null) {
  north_edge.push(current)
  current = current.trees.get('east')!
}

// traverse tree field and set visibility
let edge_last: Tree
for (edge_last of north_edge) {
  edge_last.set_vis_dir('south')
}
for (edge_last of south_edge) {
  edge_last.set_vis_dir('north')
}
for (edge_last of west_edge) {
  edge_last.set_vis_dir('east')
}
for (edge_last of east_edge) {
  edge_last.set_vis_dir('west')
}
console.log(uL?.count())

console.log("\n\n***** PART 2 *****");
console.log(uL?.get_max_scenic_score())