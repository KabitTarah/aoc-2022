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
class RPS {
    constructor(rps_string) {
        this.win = 0; // assume loss
        this.self = 0;
        this.opponent = 0;
        this.result = 0; // assume loss
        let rps = rps_string.split(' ');
        switch (rps[0]) {
            case 'A': {
                this.opponent = 1; // Rock
                break;
            }
            case 'B': {
                this.opponent = 2; // Paper
                break;
            }
            case 'C': {
                this.opponent = 3; // Scissors
                break;
            }
        }
        switch (rps[1]) {
            case 'X': {
                this.self = 1; // Rock, lose
                break;
            }
            case 'Y': {
                this.self = 2; // Paper
                this.result = 3; // Draw
                break;
            }
            case 'Z': {
                this.self = 3; // Scissors
                this.result = 6; // Win
                break;
            }
        }
    }
    score() {
        if (this.opponent == this.self) {
            this.win = 3;
        }
        else if ((this.self == 2) && (this.opponent == 1)) {
            this.win = 6;
        }
        else if ((this.self == 3) && (this.opponent == 2)) {
            this.win = 6;
        }
        else if ((this.self == 1) && (this.opponent == 3)) {
            this.win = 6;
        }
        return this.win + this.self;
    }
    score2() {
        switch (this.result) {
            case 0: {
                this.self = this.opponent - 1;
                break;
            }
            case 3: {
                this.self = this.opponent;
                break;
            }
            case 6: {
                this.self = this.opponent + 1;
                break;
            }
        }
        if (this.self == 0)
            this.self = 3;
        if (this.self == 4)
            this.self = 1;
        return this.result + this.self;
    }
}
let bouts = [];
console.log("\n\n***** PART 1 *****");
let score = 0;
let line;
for (line of input) {
    let rps = new RPS(line);
    score += rps.score();
    bouts.push(rps);
}
console.log(score);
console.log("\n\n***** PART 2 *****");
let bout;
score = 0;
for (bout of bouts) {
    score += bout.score2();
}
console.log(score);
