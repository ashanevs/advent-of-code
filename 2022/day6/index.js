const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

let counter = 0;
let charCount = 14;
let currentItems = data.split("").reduce((acc, curr, index) => {
	if (index >= charCount) {
		return acc;
	}

	acc.push(curr);

	return acc;
}, []);

for (let i = 0; i < data.length - 1; i++) {
	counter++;
	currentItems.push(data[i]);
	currentItems.shift();

	const uniques = new Set(currentItems);
	if (uniques.size === charCount) {
		break;
	}
}

console.log(counter);
