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
class Computer {
    constructor() {
        this.X = 1;
        this.cycle = 0;
        this.pixels = [];
        for (let i = 0; i < 6; i++) {
            let dots = Array(40).fill('.');
            this.pixels.push(dots);
        }
        this.values = new Map;
    }
    current_pixel() {
        let index = this.cycle - 1;
        return [Math.floor(index / 40), index % 40];
    }
    log() {
        this.values.set(this.cycle, this.X);
        //console.log(`${this.cycle}: [${this.current_pixel()} - ${this.X}]`)
        let coord = this.current_pixel();
        if (Math.abs(this.X - coord[1]) <= 1) {
            this.pixels[coord[0]][coord[1]] = '#';
        }
    }
    print() {
        let line;
        for (line of this.pixels) {
            console.log(line.join(''));
        }
    }
    operation(opstring) {
        let op = opstring.split(' ');
        if (op.length == 2) {
            // move X
            this.cycle++;
            this.log();
            this.cycle++;
            this.log();
            this.X += parseInt(op[1]);
        }
        else {
            this.cycle++;
            this.log();
        }
    }
    get(cycle) {
        return this.values.get(cycle);
    }
}
console.log("\n\n***** PART 1 *****");
let cpu = new Computer();
let line;
for (line of input) {
    cpu.operation(line);
}
let output = 0;
for (let cycle = 20; cycle <= 220; cycle += 40) {
    output += cpu.get(cycle) * cycle;
}
console.log(output);
console.log("\n\n***** PART 2 *****");
cpu.print();
