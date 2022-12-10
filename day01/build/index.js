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
class Elf {
    constructor() {
        this.values = [];
        this.sum = 0;
    }
}
let elves = [];
console.log("\n\n***** PART 1 *****");
let elf = new Elf();
let biggestElf = new Elf();
let item;
for (item of input) {
    if (item.trim() === '') {
        elves.push(elf);
        if (elf.sum > biggestElf.sum) {
            biggestElf = elf;
        }
        elf = new Elf();
    }
    else {
        elf.values.push(parseInt(item));
        elf.sum += parseInt(item);
    }
}
console.log(biggestElf.sum);
console.log("\n\n***** PART 2 *****");
// Sort the Elves
elves.sort((n1, n2) => (n2.sum - n1.sum));
let sum = elves[0].sum + elves[1].sum + elves[2].sum;
console.log(sum);
