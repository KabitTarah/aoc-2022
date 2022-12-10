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
class PacketReader {
    constructor(stream) {
        this.stream = stream;
        this.start = this.get_start(4);
    }
    get_start(count) {
        let i = 0;
        while (i < this.stream.length - count) {
            let s = new Set(this.stream.substring(i, i + count).split(''));
            if (Array.from(s.values()).length == count) {
                return i + count; // after the start sequence
            }
            i++;
        }
        return Number.MAX_VALUE;
    }
}
console.log("\n\n***** PART 1 *****");
let packet = new PacketReader(input[0]);
console.log(packet.start);
console.log("\n\n***** PART 2 *****");
console.log(packet.get_start(14));
