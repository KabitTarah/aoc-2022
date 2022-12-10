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
class Pair {
    constructor(ranges) {
        this.elf1 = [0, 0];
        this.elf2 = [0, 0];
        let range = ranges.split(',');
        let elf1 = range[0].split('-');
        let elf2 = range[1].split('-');
        this.elf1[0] = parseInt(elf1[0]);
        this.elf1[1] = parseInt(elf1[1]);
        this.elf2[0] = parseInt(elf2[0]);
        this.elf2[1] = parseInt(elf2[1]);
    }
    is_contained() {
        let A;
        let B;
        if (this.elf1[1] - this.elf1[0] > this.elf2[1] - this.elf2[0]) {
            A = this.elf1;
            B = this.elf2;
        }
        else {
            A = this.elf2;
            B = this.elf1;
        }
        if ((B[0] >= A[0]) && (B[1] <= A[1]))
            return true;
        else
            return false;
    }
    overlaps() {
        if ((this.elf1[0] >= this.elf2[0]) && (this.elf1[0] <= this.elf2[1]))
            return true;
        if ((this.elf1[1] >= this.elf2[0]) && (this.elf1[0] <= this.elf2[1]))
            return true;
        return false;
    }
}
let pairs = [];
console.log("\n\n***** PART 1 *****");
let pair;
let line;
let count = 0;
for (line of input) {
    pair = new Pair(line);
    if (pair.is_contained())
        count++;
    pairs.push(pair);
}
console.log(count);
count = 0;
console.log("\n\n***** PART 2 *****");
for (pair of pairs) {
    if (pair.overlaps())
        count++;
}
console.log(count);
