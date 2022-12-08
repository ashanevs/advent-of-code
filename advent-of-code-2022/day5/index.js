const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");
const dataByLine = data.trimEnd().split("\n");
const breakpointIndex = dataByLine.indexOf("");
const instructions = dataByLine.slice(0, breakpointIndex - 1);
const moves = dataByLine.slice(breakpointIndex + 1);
const instructions2dArr= instructions.reduce((acc, curr, index) => {
	let spacer = 0;
	let insertionIndex = 0;

	curr.split("").forEach(part => {
		if (part === "[" || part === "]") {
			return
		}

		if (part === " ") {
			spacer++;

			if (spacer === 4) {
				insertionIndex++;
				spacer = 0;
				return;
			}

			return;
		}


		if (!acc[insertionIndex]) {
			acc[insertionIndex] = [];
		}

		acc[insertionIndex].push(part);
		spacer = -1;
		insertionIndex++;
		return acc;
	});

	insertionIndex = 0;
	return acc;
}, []).map(item => item.reverse());

const moveInstructions = moves => {
	return moves.map(move => {
		const moveParts = move.split(" ");

		return {
			countToMove: moveParts[1],
			startIndex: Number(moveParts[3]) - 1,
			endIndex: Number(moveParts[5] - 1)
		}
	});
};

// puzzle one results, mutates data

// moveInstructions(moves).forEach(({
// 	countToMove,
// 	startIndex,
// 	endIndex
// }) => {
// 	for (let i = 0; i < countToMove; i++) {
// 		const startArr = instructions2dArr[startIndex];
// 		const itemToMove = startArr[startArr.length - 1];
// 		instructions2dArr[startIndex].pop();
// 		instructions2dArr[endIndex].push(itemToMove);
// 	}
// });

// const result = instructions2dArr.map(arr => arr[arr.length - 1]).join("");
// console.log(result);

// puzzle two
moveInstructions(moves).forEach(({
	countToMove,
	startIndex,
	endIndex
}) => {
	const startArr = instructions2dArr[startIndex];
	let itemsToMove = [];

	for (let i = 0; i < countToMove; i++) {
		itemsToMove.push(startArr[startArr.length - 1]);

		startArr.pop();
	}

	instructions2dArr[endIndex].push(...(itemsToMove.reverse()));
});

const result = instructions2dArr.map(arr => arr[arr.length - 1]).join("");
console.log(result);
