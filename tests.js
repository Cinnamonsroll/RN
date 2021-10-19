const parse = require('./parser.js');
const tests = [
  {
    name: "Primary",
    input: `{name} = "*mit^*";`,
    expected: {
      "name": "MIT"
    }
  },
  {
    name: "Dos",
    input: `{name} = "calc"; {desc} = ":name: meow";`,
    expected: {
      "name": "calc",
      "desc": "calc meow"
    }
  },
  {
    name: "Depth",
    input: `{name} = "calculator"; {version} = "1.0.0"; {description} = ":name: created in js";  {main} = "index.js";  {author} = "Velddev";  {license} = "*mit^*"; {scripts} = ("start":"node src/index");  {devDependencies} = ("jest":"^27.2.5", "canvas":"^0.1.1");`,
    expected: {
      "author": "Velddev",
      "description": "calculator created in js",
      "devDependencies": {
        "canvas": "^0.1.1",
        "jest": "^27.2.5"
      },
      "license": "MIT",
      "main": "index.js",
      "name": "calculator",
      "scripts": {
        "start": "node src/index"
      },
      "version": "1.0.0"
    }
  }
];

// Yoinked from https://stackoverflow.com/a/16788517
function objectEquals(x, y) {
  'use strict';

  if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
  // after this just checking type of one would be enough
  if (x.constructor !== y.constructor) { return false; }
  // if they are functions, they should exactly refer to same one (because of closures)
  if (x instanceof Function) { return x === y; }
  // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
  if (x instanceof RegExp) { return x === y; }
  if (x === y || x.valueOf() === y.valueOf()) { return true; }
  if (Array.isArray(x) && x.length !== y.length) { return false; }

  // if they are dates, they must had equal valueOf
  if (x instanceof Date) { return false; }

  // if they are strictly equal, they both need to be object at least
  if (!(x instanceof Object)) { return false; }
  if (!(y instanceof Object)) { return false; }

  // recursive object equality check
  var p = Object.keys(x);
  return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
      p.every(function (i) { return objectEquals(x[i], y[i]); });
}

tests.map(({name, input,expected},index) => {
  const output = parse(input);
  if(objectEquals(output, expected)) {
    console.log(`Test #${index+1} (${name}): Passed ✅`)
    return true;
  }
  console.log(`Test #${index+1} (${name}): Failed ❌`)
  return false;
})