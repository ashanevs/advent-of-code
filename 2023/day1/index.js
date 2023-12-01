const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");
const dataByLine = data.trim().split("\n");

const result = dataByLine.reduce((acc, curr) => {
	const numbers = curr.split("").reduce((acc, curr, index) => {
		if (!isNaN(parseInt(curr, 10))) {
			acc.push(curr);
		}

		return acc;
	}, []);

	acc += Number(numbers[0] + numbers[numbers.length - 1]);

	return acc;
}, 0);

console.log(result);
