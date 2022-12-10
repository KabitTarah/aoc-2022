import * as fs from 'fs';
let input: Array<string> = fs.readFileSync('input', 'utf8').split('\n');

class RPS {
  opponent: number;
  self: number;
  result: number;
  win: number;
  
  constructor(rps_string: string) {
    this.win = 0; // assume loss
    this.self = 0;
    this.opponent = 0;
    this.result = 0; // assume loss
    let rps: Array<string> = rps_string.split(' ');
    switch (rps[0]) {
      case 'A': { 
        this.opponent = 1; // Rock
        break;
      } case 'B': {
        this.opponent = 2; // Paper
        break;
      } case 'C': {
        this.opponent = 3; // Scissors
        break;
      }
    }
    switch (rps[1]) {
      case 'X': {
        this.self = 1; // Rock, lose
        break;
      } case 'Y': {
        this.self = 2; // Paper
        this.result = 3; // Draw
        break;
      } case 'Z': {
        this.self = 3; // Scissors
        this.result = 6; // Win
        break;
      }
    }
  }

  score() {
    if (this.opponent == this.self) {
      this.win = 3;
    } else if ((this.self == 2) && (this.opponent == 1)) {
      this.win = 6;
    } else if ((this.self == 3) && (this.opponent == 2)) {
      this.win = 6;
    } else if ((this.self == 1) && (this.opponent == 3)) {
      this.win = 6;
    }

    return this.win + this.self;
  }

  score2() {
    switch (this.result) {
      case 0: {
        this.self = this.opponent - 1;
        break;
      } case 3: {
        this.self = this.opponent;
        break;
      } case 6: {
        this.self = this.opponent + 1;
        break;
      }
    }
    if (this.self == 0) this.self = 3;
    if (this.self == 4) this.self = 1;
    return this.result + this.self;
  }
}
let bouts: Array<RPS> = [];

console.log("\n\n***** PART 1 *****");
let score: number = 0;
let line: string;
for (line of input) {
  let rps: RPS = new RPS(line);
  score += rps.score();
  bouts.push(rps);
}
console.log(score);

console.log("\n\n***** PART 2 *****");
let bout: RPS;
score = 0;
for (bout of bouts) {
  score += bout.score2()
}
console.log(score)