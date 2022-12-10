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
const strmap = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
class ElfGroup {
    constructor(A, B, C) {
        this.elves = [];
        this.elves.push(A);
        this.elves.push(B);
        this.elves.push(C);
        this.tag = this.common_element();
    }
    common_element() {
        let A = new Set(this.elves[0].items);
        let B = new Set(this.elves[1].items);
        let C = new Set(this.elves[2].items);
        let item;
        for (item of A) {
            if (B.has(item) && C.has(item)) {
                return item;
            }
        }
        return '_';
    }
}
class Rucksack {
    constructor(contents) {
        this.items = contents.split('');
        this.compartment1 = this.items.slice(0, this.items.length / 2);
        this.compartment2 = this.items.slice(this.items.length / 2);
    }
    common_element() {
        let A = new Set(this.compartment1);
        let B = new Set(this.compartment2);
        let item;
        for (item of A) {
            if (B.has(item)) {
                return strmap.indexOf(item);
            }
        }
        return 0;
    }
}
let rucksacks = [];
console.log("\n\n***** PART 1 *****");
let rucksack;
let line;
let total = 0;
for (line of input) {
    rucksack = new Rucksack(line);
    total += rucksack.common_element();
    rucksacks.push(rucksack);
}
console.log(total);
console.log("\n\n***** PART 2 *****");
let elfGroups = [];
total = 0;
for (let i = 0; i < rucksacks.length; i += 3) {
    let eg = new ElfGroup(rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]);
    total += strmap.indexOf(eg.tag);
    elfGroups.push(eg);
}
console.log(total);
