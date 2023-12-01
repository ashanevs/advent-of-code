const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");
const dataByLine = data.trim().split("\n");

const result = dataByLine.reduce((acc, curr) => {
	let firstChar;
	let lastChar;

	curr.split("").forEach((char, index) => {
		console.log(!isNaN(parseInt(char, 10)));
		if (!isNaN(parseInt(char, 10))) {
			if (!firstChar) {
				console.log("WHY", firstChar)
				firstChar = char;
			} else {
				lastChar = char;
			}
		}

		global.console.log(curr, firstChar, lastChar);

		acc = acc + Number(firstChar + (lastChar || firstChar));

		firstChar = "";
		lastChar = "";

		return acc;
	});
}, 0);

console.log(result);
