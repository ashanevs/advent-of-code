const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

// Puzzle One
const getMaxCalories = (data) => {
	const dataByLine = data.split("\n");

	let index = 0;
	const dataByElf = dataByLine.reduce((acc, curr) => {
		if (curr === "") {
			index += 1;

			return acc;
		}

		if (!acc[index]) {
			acc.push([]);
		}

		acc[index].push(curr);

		return acc;
	}, []);

	return dataByElf.reduce((acc, curr) => {
		const currentElfCalories = curr.reduce((acc, curr) => Number(curr) + acc, 0);

		return currentElfCalories > acc ? currentElfCalories : acc;
	}, 0);
};

global.console.log(getMaxCalories(data));
// answer - 72017

// Puzzle Two
const getTopThreeMaxCalories = (data) => {
	const dataByLine = data.split("\n");

	let index = 0;
	const dataByElf = dataByLine.reduce((acc, curr) => {
		if (curr === "") {
			index += 1;

			return acc;
		}

		if (!acc[index]) {
			acc.push([]);
		}

		acc[index].push(curr);

		return acc;
	}, []);

	const summedCalories = dataByElf.map(arrOfCalories => arrOfCalories.reduce((acc, curr) => Number(curr) + acc, 0)).sort();
	const totalLength = summedCalories.length;

	return summedCalories[totalLength - 1] + summedCalories[totalLength - 2] + summedCalories[totalLength - 3];
};

global.console.log(getTopThreeMaxCalories(data));
// answer - 212520
