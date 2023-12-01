const fs = require("fs");

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const shapeScoreLookup = {
	[ROCK]: 1,
	[PAPER]: 2,
	[SCISSORS]: 3
};

const LOST = "lost";
const DRAW = "draw";
const WON = "won";

const outcomeScoreLookup = {
	[LOST]: 0,
	[DRAW]: 3,
	[WON]: 6
};

const theirMoveLookup = {
	A: ROCK,
	B: PAPER,
	C: SCISSORS
};

const myMoveLookup = {
	X: ROCK,
	Y: PAPER,
	Z: SCISSORS
};

const data = fs.readFileSync("./input.txt", "utf8");
const dataByLine = data.trim().split("\n");

// puzzle 1
// const result = dataByLine.reduce((acc, curr) => {
// 	const [theirInput, myInput] = curr.split(" ");
// 	const theirMove = theirMoveLookup[theirInput];
// 	const myMove = myMoveLookup[myInput];

// 	let outcome;

// 	switch (true) {
// 		case
// 			(myMove === PAPER && theirMove === SCISSORS) ||
// 			(myMove === ROCK && theirMove === PAPER) ||
// 			(myMove === SCISSORS && theirMove === ROCK) :

// 			outcome = LOST;
// 			break;
// 		case
// 			(myMove === SCISSORS && theirMove === PAPER) ||
// 			(myMove === PAPER && theirMove === ROCK) ||
// 			(myMove === ROCK && theirMove === SCISSORS) :

// 			outcome = WON;
// 			break;

// 		default:
// 			outcome = DRAW;
// 			break;
// 	}

// 	acc += (shapeScoreLookup[myMove] + outcomeScoreLookup[outcome]);

// 	return acc;
// }, 0);

// console.log(result);

const moveToOutcomeLookup = {
	X: LOST,
	Y: DRAW,
	Z: WON
};

const theirMoveToLostLookup = {
	[PAPER]: ROCK,
	[ROCK]: SCISSORS,
	[SCISSORS]: PAPER
};

const theirMoveToWinLookup = {
	[ROCK]: PAPER,
	[SCISSORS]: ROCK,
	[PAPER]: SCISSORS
};

const result = dataByLine.reduce((acc, curr) => {
	const [theirInput, myInput] = curr.split(" ");
	const theirMove = theirMoveLookup[theirInput];
	const outcome = moveToOutcomeLookup[myInput];

	let myMove;

	switch (outcome) {
		case LOST:
			myMove = theirMoveToLostLookup[theirMove];
			break;
		case WON:
			myMove = theirMoveToWinLookup[theirMove];
			break;
		default:
			myMove = theirMove;
			break;
	}
	console.log(myMove, theirMove);

	acc += (shapeScoreLookup[myMove] + outcomeScoreLookup[outcome]);

	return acc;
}, 0);

console.log(result);
