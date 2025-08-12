// at()
let numeros1 = [10, 20, 30, 40];
console.log(numeros1.at(2)); // 30
console.log(numeros1.at(-1)); // 40

// concat()
let numeros2 = [1, 2];
console.log(numeros2.concat([3, 4])); // [1, 2, 3, 4]

let numeros = [1, 2, 3];
console.log(numeros.constructor); 
// ƒ Array() { [native code] }

// copyWithin()
let numeros3 = [1, 2, 3, 4, 5];
console.log(numeros3.copyWithin(0, 3)); // [4, 5, 3, 4, 5]

// entries()
let numeros4 = [5, 10, 15];
for (let [i, val] of numeros4.entries()) {
  console.log(i, val);
}

// every()
let numeros5 = [2, 4, 6];
console.log(numeros5.every(num => num % 2 === 0)); // true

// fill()
let numeros6 = [1, 2, 3, 4];
console.log(numeros6.fill(0, 1, 3)); // [1, 0, 0, 4]

// filter()
let numeros7 = [1, 2, 3, 4];
console.log(numeros7.filter(num => num > 2)); // [3, 4]

// find()
let numeros8 = [5, 10, 15];
console.log(numeros8.find(num => num > 8)); // 10

// findIndex()
console.log(numeros8.findIndex(num => num > 8)); // 1

// findLast()
console.log(numeros8.findLast(num => num > 8)); // 15

// findLastIndex()
console.log(numeros8.findLastIndex(num => num > 8)); // 2

// flat()
let numeros9 = [1, [2, [3, 4]]];
console.log(numeros9.flat(2)); // [1, 2, 3, 4]

// flatMap()
let numeros10 = [1, 2, 3];
console.log(numeros10.flatMap(num => [num, num * 2])); // [1, 2, 2, 4, 3, 6]

// forEach()
numeros10.forEach(num => console.log(num * 2));

// includes()
console.log([1, 2, 3].includes(2)); // true

// indexOf()
console.log([1, 2, 3].indexOf(3)); // 2

// join()
console.log([1, 2, 3].join("-")); // "1-2-3"

// keys()
for (let key of [10, 20, 30].keys()) console.log(key);

// lastIndexOf()
console.log([1, 2, 3, 2].lastIndexOf(2)); // 3

// map()
console.log([1, 2, 3].map(num => num * 2)); // [2, 4, 6]

// pop()
let numeros11 = [1, 2, 3];
console.log(numeros11.pop()); // 3
console.log(numeros11); // [1, 2]

// push()
let numeros12 = [1, 2];
numeros12.push(3);
console.log(numeros12); // [1, 2, 3]

// reduce()
console.log([1, 2, 3].reduce((a, b) => a + b, 0)); // 6

// reduceRight()
console.log([1, 2, 3].reduceRight((a, b) => a - b)); // 0

// reverse()
console.log([1, 2, 3].reverse()); // [3, 2, 1]

// shift()
let numeros13 = [1, 2, 3];
console.log(numeros13.shift()); // 1
console.log(numeros13); // [2, 3]

// slice()
console.log([1, 2, 3, 4].slice(1, 3)); // [2, 3]

// some()
console.log([1, 2, 3].some(num => num > 2)); // true

// sort()
console.log([3, 1, 2].sort()); // [1, 2, 3]

// splice()
let numeros14 = [1, 2, 3, 4];
numeros14.splice(1, 2, 99);
console.log(numeros14); // [1, 99, 4]

// toLocaleString()
console.log([1000, 2000].toLocaleString()); // "1,000,2,000" (según región)

// toString()
console.log([1, 2, 3].toString()); // "1,2,3"

// unshift()
let numeros15 = [2, 3];
numeros15.unshift(1);
console.log(numeros15); // [1, 2, 3]

// values()
for (let val of [10, 20, 30].values()) console.log(val);



