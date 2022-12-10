"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
let input = fs.readFileSync('input', 'utf8').split('\n');
class Directory {
    constructor(name, parent) {
        this.name = name;
        if (parent === null)
            parent = this;
        this.parent = parent;
        this.subdirectories = new Map();
        this.files = new Map();
        this.subdirectory_names = [];
        this.direct_size = 0;
    }
    add(line) {
        let pair = line.split(' ');
        let size = parseInt(pair[0]);
        if (!isNaN(size)) {
            this.files.set(pair[1], size);
            this.direct_size += size;
        }
        else if (pair[0] == 'dir') {
            this.subdirectory_names.push(pair[1]);
        }
    }
    get_indirect_size() {
        let size = this.direct_size;
        let dir;
        for (dir of this.subdirectories.values()) {
            size += dir.get_indirect_size();
        }
        return size;
    }
}
console.log("\n\n***** PART 1 *****");
let root = new Directory('/', null);
let current = root;
let line;
for (line of input) {
    if (line[0] == '$') { // Command
        let command = line.split(' ');
        if (command[1] == 'cd') {
            switch (command[2]) {
                case '/': {
                    current = root;
                    break;
                }
                case '..': {
                    current = current.parent;
                    break;
                }
                default: {
                    if (Array.from(current.subdirectories.keys()).includes(command[2]))
                        current = current.subdirectories.get(command[2]);
                    else if (current.subdirectory_names.includes(command[2])) {
                        let dir = new Directory(command[2], current);
                        current.subdirectories.set(command[2], dir);
                        current = dir;
                    }
                    break;
                }
            }
        }
        // ignore ls. The next part will handle it
    }
    else {
        current.add(line);
    }
}
// traverse tree and sum sizes 100000 or less
let stack = [root];
let total = 0;
while (stack.length > 0) {
    current = stack.pop();
    let size = current.get_indirect_size();
    if (size <= 100000)
        total += size;
    let next;
    for (next of current.subdirectories.values())
        stack.push(next);
}
console.log(total);
console.log("\n\n***** PART 2 *****");
let needed = 30000000;
let max_space = 70000000;
let free = 70000000 - root.get_indirect_size();
let minimum = needed - free;
console.log(`I need to free up at least ${minimum}`);
// traverse tree and find smallest sum size at least `minimum`
let smallest = root.get_indirect_size();
let name = root.name;
stack = [root];
while (stack.length > 0) {
    current = stack.pop();
    let size = current.get_indirect_size();
    if ((size > minimum) && (size < smallest)) {
        smallest = size;
        name = current.name;
    }
    let next;
    for (next of current.subdirectories.values())
        stack.push(next);
}
console.log(`${name} is smallest fitting directory with ${smallest} space`);
