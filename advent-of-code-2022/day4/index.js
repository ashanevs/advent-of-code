const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");
const dataByLine = data.trim().split("\n");

const getResult = (data, cb) => {
	return data.reduce((acc, curr) => {
		const [range1, range2] = curr.split(",");
		const [lowerRange1, upperRange1] = range1.split("-").map(item => Number(item));
		const [lowerRange2, upperRange2] = range2.split("-").map(item => Number(item));

		if (cb(lowerRange1, lowerRange2, upperRange1, upperRange2)) {
			acc++;
		}

		return acc;
	}, 0);
};

const checkRangesAreWithinEachOther = (lowerRange1, lowerRange2, upperRange1, upperRange2) => {
	return (lowerRange1 >= lowerRange2 && upperRange1 <= upperRange2) ||
		(lowerRange2 >= lowerRange1 && upperRange2 <= upperRange1);
};

console.log(getResult(dataByLine, checkRangesAreWithinEachOther));

const checkRangesOverlap = (lowerRange1, lowerRange2, upperRange1, upperRange2) => {
	return upperRange1 >= lowerRange2 && lowerRange1 <= upperRange2
};

console.log(getResult(dataByLine, checkRangesOverlap));
