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
class Supply {
    constructor() {
        this.stacks = [[], [], [], [], [], [], [], [], [], []];
    }
    add(id, item) {
        this.stacks[id].push(item);
    }
    peek_all() {
        let outArray = [];
        for (let i = 1; i < this.stacks.length; i++) {
            outArray.push(this.stacks[i].at(-1));
        }
        return outArray.join('');
    }
    move_one(from, to) {
        if (this.stacks[from].length > 0)
            this.stacks[to].push(this.stacks[from].pop());
    }
    move_n(count, from, to) {
        if (this.stacks[from].length < count)
            count = this.stacks[from].length;
        let transfer = [];
        for (let i = 0; i < count; i++) {
            transfer.push(this.stacks[from].pop());
        }
        let item;
        for (let i = 0; i < count; i++) {
            this.stacks[to].push(transfer.pop());
        }
    }
    move(count, from, to) {
        for (let c = 0; c < count; c++) {
            this.move_one(from, to);
        }
    }
    copy() {
        let supply = new Supply();
        for (let i = 0; i < this.stacks.length; i++) {
            supply.stacks[i] = this.stacks[i].slice();
        }
        return supply;
    }
    print() {
        let stack;
        for (stack of this.stacks)
            console.log(stack);
    }
}
let supply = new Supply();
console.log("\n\n***** PART 1 *****");
let supplyInput = [];
let line = input.shift();
while (line.trim() != '') {
    supplyInput.push(line);
    line = input.shift();
}
supplyInput.pop(); // get rid of stack index values
while (supplyInput.length > 0) {
    line = supplyInput.pop();
    for (let i = 1; i <= 9; i++) {
        let index = (i - 1) * 4 + 1; // index in string starts at 1 and has 4 spaces between each 
        if (line[index] != ' ') {
            supply.add(i, line[index]);
        }
    }
}
let supply2 = supply.copy();
for (line of input) {
    let instruction = line.split(' ');
    let count = parseInt(instruction[1]);
    let from = parseInt(instruction[3]);
    let to = parseInt(instruction[5]);
    supply.move(count, from, to);
}
//supply.print()
console.log(supply.peek_all());
console.log("\n\n***** PART 2 *****");
for (line of input) {
    let instruction = line.split(' ');
    let count = parseInt(instruction[1]);
    let from = parseInt(instruction[3]);
    let to = parseInt(instruction[5]);
    supply2.move_n(count, from, to);
}
console.log(supply2.peek_all());
