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
const directions = new Map([['L', [-1, 0]],
    ['R', [1, 0]],
    ['U', [0, 1]],
    ['D', [0, -1]]]);
class Head {
    constructor(parent, id, id_max) {
        this.location = [0, 0];
        this.id = id;
        this.head = parent;
        if (this.id > id_max)
            this.tail = null;
        else
            this.tail = new Head(this, this.id + 1, id_max);
        this.visited = new Map([[0, new Set([0])]]);
    }
    update_visited() {
        if (!this.visited.has(this.location[0])) {
            this.visited.set(this.location[0], new Set());
        }
        this.visited.get(this.location[0]).add(this.location[1]);
    }
    move(direction, distance) {
        for (let i = 0; i < distance; i++) {
            this.location[0] += directions.get(direction)[0];
            this.location[1] += directions.get(direction)[1];
            if (this.tail != null)
                this.tail.follow(direction);
        }
        //console.log(`${direction} ${distance} now at [${this.location}]`)
    }
    follow(direction) {
        if (this.far_from_head()) {
            let dist = this.dist_from_head();
            if (dist[0] != 0)
                this.location[0] += dist[0] / (Math.abs(dist[0]));
            if (dist[1] != 0)
                this.location[1] += dist[1] / (Math.abs(dist[1]));
            this.update_visited();
            //console.log(`Tail ${this.id} moved to [${this.location}]`)
            if (this.tail != null)
                this.tail.follow(direction);
        }
    }
    far_from_head() {
        if (this.head === null)
            return false;
        let x = Math.abs(this.location[0] - this.head.location[0]);
        let y = Math.abs(this.location[1] - this.head.location[1]);
        if ((Math.abs(this.location[0] - this.head.location[0]) <= 1) &&
            (Math.abs(this.location[1] - this.head.location[1]) <= 1))
            return false;
        return true;
    }
    dist_from_head() {
        if (this.head === null)
            return [0, 0];
        let x = this.head.location[0] - this.location[0];
        let y = this.head.location[1] - this.location[1];
        return [x, y];
    }
    count(id) {
        let tail = this;
        while (tail.id != id) {
            console.log(tail.id);
            tail = tail.tail;
        }
        console.log(tail.id);
        let total = 0;
        let val;
        for (val of tail.visited.values()) {
            total += Array.from(val.values()).length;
        }
        return total;
    }
}
console.log("\n\n***** PART 1 *****");
let head = new Head(null, 0, 9);
let line;
for (line of input) {
    let split = line.split(' ');
    let direction = split[0];
    let distance = parseInt(split[1]);
    head.move(direction, distance);
}
console.log(head.count(1));
console.log("\n\n***** PART 2 *****");
console.log(head.count(9));
