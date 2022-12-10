import * as fs from 'fs';
let input: Array<string> = fs.readFileSync('input', 'utf8').split('\n');

class Directory {
  parent: Directory
  name: string
  subdirectories: Map<string, Directory>
  subdirectory_names: Array<string>
  files: Map<string, number>
  direct_size: number
  
  constructor(name: string, parent: Directory | null) {
    this.name = name
    if (parent === null) parent = this;
    this.parent = parent
    this.subdirectories = new Map()
    this.files = new Map()
    this.subdirectory_names = []
    this.direct_size = 0
  }

  add(line: string) {
    let pair: Array<string> = line.split(' ')
    let size: number = parseInt(pair[0])
    if (!isNaN(size)) {
      this.files.set(pair[1], size)
      this.direct_size += size
    } else if (pair[0] == 'dir') {
      this.subdirectory_names.push(pair[1])
    }
  }

  get_indirect_size() {
    let size: number = this.direct_size
    let dir: Directory
    for (dir of this.subdirectories.values()) {
      size += dir.get_indirect_size()
    }
    return size
  }
}

console.log("\n\n***** PART 1 *****");
let root: Directory = new Directory('/', null)
let current: Directory = root
let line: string
for (line of input) {
  if (line[0] == '$') {  // Command
    let command: Array<string> = line.split(' ')
    if (command[1] == 'cd') {
      switch (command[2]) {
        case '/': {
          current = root
          break
        } case '..': {
          current = current.parent
          break
        } default: {
          if (Array.from(current.subdirectories.keys()).includes(command[2])) current = current.subdirectories.get(command[2])!;
          else if (current.subdirectory_names.includes(command[2])) {
            let dir: Directory = new Directory(command[2], current)
            current.subdirectories.set(command[2], dir)
            current = dir
          } 
          break
        }
      }
    }
    // ignore ls. The next part will handle it
  } else {
    current.add(line)
  }
}

// traverse tree and sum sizes 100000 or less
let stack: Array<Directory> = [root]
let total: number = 0
while (stack.length > 0) {
  current = stack.pop()!
  let size: number = current.get_indirect_size()
  if (size <= 100000) total += size;
  let next: Directory
  for (next of current.subdirectories.values()) stack.push(next);
}
console.log(total)

console.log("\n\n***** PART 2 *****");
let needed: number = 30000000
let max_space: number = 70000000
let free: number = 70000000 - root.get_indirect_size()
let minimum: number = needed - free
console.log(`I need to free up at least ${minimum}`)
// traverse tree and find smallest sum size at least `minimum`
let smallest: number = root.get_indirect_size()
let name: string = root.name
stack = [root]
while (stack.length > 0) {
  current = stack.pop()!
  let size: number = current.get_indirect_size()
  if ((size > minimum) && (size < smallest)) {
    smallest = size
    name = current.name
  }
  let next: Directory
  for (next of current.subdirectories.values()) stack.push(next);
}
console.log(`${name} is smallest fitting directory with ${smallest} space`)