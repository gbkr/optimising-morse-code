const letterFreq = {
  e: 12.49,
  t: 9.28,
  a: 8.04,
  o: 7.64,
  i: 7.57,
  n: 7.23,
  s: 6.51,
  r: 6.28,
  h: 5.05,
  l: 4.07,
  d: 3.82,
  c: 3.34,
  u: 2.73,
  m: 2.51,
  f: 2.4,
  p: 2.14,
  g: 1.87,
  w: 1.68,
  y: 1.66,
  b: 1.48,
  v: 1.05,
  k: 0.54,
  x: 0.23,
  j: 0.16,
  q: 0.12,
  z: 0.09,
};

const morseCode = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
};

const dit = 1;
const dah = 3;
const chars = [".", "-"];

function codeScores() {
  function score(str) {
    const scorer = (acc, val) => acc + (val === chars[0] ? dit : dah);
    return str.split("").reduce(scorer, 0) + str.length - 1;
  }

  let codeToScore = {};
  const maxCount = 6;
  let prevIteration = [];
  let currentIteration = [];

  for (let i = 0; i < maxCount; i++) {
    if (prevIteration.length == 0) {
      for (let char in chars) {
        currentIteration.push(chars[char]);
      }
    } else {
      for (let str in prevIteration) {
        for (let char in chars) {
          currentIteration.push(`${prevIteration[str]}${chars[char]}`);
        }
      }
    }

    prevIteration = currentIteration;
    currentIteration = [];

    for (let str in prevIteration) {
      let code = prevIteration[str];
      codeToScore[code] = score(code);
    }
  }

  return codeToScore;
}

function* leastCommonLetter() {
  lettersSorted = Object.keys(letterFreq).sort(
    (a, b) => letterFreq[a] - letterFreq[b]
  );
  for (let i = 0; i < Object.keys(letterFreq).length; i++) {
    yield lettersSorted.pop();
  }
}

function* shortestCode() {
  codes = codeScores();
  codesSorted = Object.keys(codes).sort((a, b) => codes[a] - codes[b]);
  for (let i = 0; i < Object.keys(codes).length; i++) {
    yield codesSorted[i];
  }
}

function createCode() {
  const newCode = {};
  const sc = shortestCode();
  for (const letter of leastCommonLetter()) {
    newCode[letter] = sc.next().value;
  }
  return newCode;
}

function morseScore(morse) {
  codes = codeScores();
  const scores = Object.entries(letterFreq).map(
    ([letter, lFreq]) => lFreq * codes[morse[letter]]
  );
  return scores.reduce((acc, e) => acc + e);
}

const newCode = createCode();

const mScore = morseScore(morseCode);
const m2Score = morseScore(newCode);

console.log(newCode);

const improvement = (1 - m2Score / mScore) * 100;
console.log(`${improvement.toFixed(2)}% improvement`);
