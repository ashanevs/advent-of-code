const fs = require("fs");

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const alphabetUppercase = alphabet.map(letter => letter.toUpperCase());
const allLetters = alphabet.concat(alphabetUppercase);
const priorityMap = allLetters.reduce((acc, curr, index) => {
	acc[curr] = index + 1;

	return acc;
}, {});

const data = fs.readFileSync("./input.txt", "utf8");
const dataByLine = data.trim().split("\n");

const getSharedLetter = item => {
	const firstHalf = item.slice(0, item.length / 2);
	const secondHalf = item.slice(item.length / 2);

	let result;

	for (let i = 0; i < firstHalf.length; i++) {
		for (let j = 0; j < secondHalf.length; j++) {
			if (firstHalf[i] === secondHalf[j]) {
				result = firstHalf[i];
			}
		}

		if (result) break;
	}

	return result;
};

const sumOfItemPriorities = (data) => {
	return data.reduce((acc, curr) => {
		const sharedLetter = getSharedLetter(curr);

		acc += priorityMap[sharedLetter];

		return acc;
	}, 0);
}

console.log(sumOfItemPriorities(dataByLine));

// puzzle 2
const getTriSharedLetter = (item1, item2, item3) => {
	let result;

	for (let i = 0; i < item1.length; i++) {
		for (let j = 0; j < item2.length; j++) {
			for (let k = 0;  k < item3.length; k++) {
				if (item1[i] === item2[j] && item1[i] === item3[k]) {
					result = item1[i];
				}
			}
		}

		if (result) break;
	}

	return result;
};

const sumOfItemPrioritiesForTriplets = (data) => {
	return data.reduce((acc, curr, index) => {
		if (index % 3 === 0) {
			const sharedLetter = getTriSharedLetter(data[index], data[index + 1], data[index + 2]);

			acc += priorityMap[sharedLetter];
		}

		return acc;
	}, 0);
}

console.log(sumOfItemPrioritiesForTriplets(dataByLine));
