const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");
const dataByLine = data.trimEnd().split("\n");

function get(object, path) {
	let index = 0
	const length = path.length;

	while (object != null && index < length) {
	  object = object[path[index++]]
	}

	return (index && index == length) ? object : undefined
}

const dataStructure = dataByLine.reduce(({ pwd, data }, curr, index) => {
	global.console.log(index)
	const lineParts = curr.split(" ");

	if (lineParts[0] === "$") {
		if (lineParts[1] === "cd") {
			if (lineParts[2] === "/") {
				pwd = ["/"];

				return { pwd, data };
			}

			if (lineParts[2] === "..") {
				pwd.pop();

				return { pwd, data };
			}

			if (!get(data, [...pwd, lineParts[2]])) {
				get(data, pwd)[lineParts[2]] = {};
			}

			pwd.push(lineParts[2]);

			return { pwd, data };
		}

		if (lineParts[1] === "ls") {
			return { pwd, data };
		}
	}

	if (lineParts[0] === "dir") {
		if (!get(data, [...pwd, lineParts[1]])) {
			get(data, pwd)[lineParts[1]] = {};
		}

		return { pwd, data };
	}

	get(data, pwd)[`file${index}`] = Number(lineParts[0]);

	return { pwd, data };

}, { pwd: ["/"], data: { "/" : {} } });

console.log(JSON.stringify(dataStructure, null, 2));

const totalPerKey = {};

const buildTotalPerKey = (obj, parent = "/", path = []) => {
	const keys = Object.keys(obj);

	if (!totalPerKey[parent]) {
		totalPerKey[parent] = 0;
	}

	for (let i = 0; i < keys.length; i++) {
		if (keys[i].includes("file")) {
			path.forEach(path => {
				totalPerKey[path] += obj[keys[i]];
			});

			continue;
		}

		buildTotalPerKey(obj[keys[i]], keys[i], path.concat(keys[i]));
	}
};

buildTotalPerKey(dataStructure.data);

console.log(totalPerKey)

const sumOfSizesBelow = (totalPerKey, below = 100000) => {
	return Object.keys(totalPerKey).reduce((acc, curr) => {
		if (totalPerKey[curr] <= below) {
			acc += totalPerKey[curr];
		}

		return acc;
	}, 0);
};

console.log(sumOfSizesBelow(totalPerKey));
