// let array = [1, 2, 3, 4, 5];

// function mutableFunction(array) {
//   array.push(7);
//   return array;
// }

// function imutableFunction(array) {
//   array.push(7);
//   return array;
// }

// console.log(imutableFunction([...array]));
// console.log(array);

let obj = {
  foo: 2,
  bar: 5
}

let { foo, bar } = obj;

console.log(foo, bar);