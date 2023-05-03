const milion = 1000000;
const thousand = 1000;
const hundred = 100;
const twenty = 20;
// const zero = 0;

const roots = {
  zero: "ნოლ",
  one: "ერთ",
  two: "ორ",
  three: "სამ",
  four: "ოთხ",
  five: "ხუთ",
  six: "ექვს",
  seven: "შვიდ",
  eight: "რვა",
  nine: "ცხრა",
  ten: "ათ",
  eleven: "თერთ",
  twelve: "თორ",
  thirteen: "ცა",
  hundred: "ას",
  thousand: "ათას",
  twenty: "ოც",
  milion: "მილიონ",
  more: "მეტ",
  ending: "ი",
  t: "თ",
  and: "და",
};

const numbers = {
  0: roots.zero,
  1: roots.one,
  2: roots.two,
  3: roots.three,
  4: roots.four,
  5: roots.five,
  6: roots.six,
  7: roots.seven,
  8: roots.eight,
  9: roots.nine,
  10: roots.ten,
  11: roots.t + roots.one + roots.more,
  12: roots.t + roots.two + roots.more,
  13: roots.thirteen + roots.more,
  14: roots.t + roots.four + roots.more,
  15: roots.t + roots.five + roots.more,
  16: roots.t + roots.six + roots.more,
  17: "ჩვიდ" + roots.more,
  18: "თვრა" + roots.more,
  19: roots.nine + roots.more,
  [twenty]: roots.twenty,
  [hundred]: roots.hundred,
  [thousand]: roots.thousand,
  [milion]: roots.milion,
};

const getEnding = (number) => {
  if (number === 8 || number === 9) {
    return "";
  }

  return roots.ending;
};

const getDivider = (number) => {
  if (number > milion) {
    return milion;
  }
  if (number > thousand) {
    return thousand;
  }
  if (number > hundred) {
    return hundred;
  }
  if (number > twenty) {
    return twenty;
  }

  return undefined;
};

export const generateText = (number) => {
  const divider = getDivider(number);

  if (divider === undefined) {
    return numbers[number] + getEnding(number);
  }

  const integerPart = Math.trunc(number / divider);
  const remained = number % divider;

  const isSimpleIntegerPart = numbers[integerPart] !== undefined;
  const isSimpleRemainedPart = numbers[remained] !== undefined;

  //1. handles if both are simple

  const integerPartText =
    divider === twenty || divider === hundred
      ? numbers[integerPart]
      : numbers[integerPart] + getEnding(integerPart);

  if (isSimpleIntegerPart && isSimpleRemainedPart) {
    if (integerPart > 1) {
      return (
        integerPartText +
        numbers[divider] +
        roots.and +
        numbers[remained] +
        getEnding(number)
      );
    } else {
      return (
        numbers[divider] + roots.and + numbers[remained] + getEnding(number)
      );
    }
  }

  //2. handle integer is simple but remained is complex

  if (isSimpleIntegerPart && !isSimpleRemainedPart) {
    if (integerPart > 1) {
      return integerPartText + numbers[divider] + generateText(remained);
    } else {
      return numbers[divider] + roots.and + generateText(remained);
    }
  }

  //3.  handle integer is complex but remained is simple

  if (!isSimpleIntegerPart && isSimpleRemainedPart) {
    return (
      generateText(integerPart) +
      numbers[divider] +
      numbers[remained] +
      roots.ending
    );
  }

  //4. both are complex
  return generateText(integerPart) + numbers[divider] + generateText(remained);
};

const getPolishedText = (text) => {
  return text
    .replace("ოროცდა", "ორმოცდა")
    .replace("ასდა", "ას")
    .replace("დანოლი", roots.ending);
};

const app = (number) => {
  if (numbers[number]) {
    return numbers[number] + getEnding(number);
  }

  return getPolishedText(generateText(number));
};

console.log(app(1));
console.log(app(9));
console.log(app(11));
console.log(app(42));
console.log(app(60));
console.log(app(62));
console.log(app(75));
console.log(app(150));
console.log(app(230));
console.log(app(670));
console.log(app(674));
console.log(app(1203));
console.log(app(5234));
console.log(app(60123));
console.log(app(610423));
console.log(app(6100002));
console.log(app(20001));
