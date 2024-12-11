console.time("elapsed");

let stones = "0 27 5409930 828979 4471 3 68524 170";

const blink = (n) => {
  for (let i = 1; i <= n; i++) {
    stones = stones
      .split(" ")
      .map((stone) => changeStone(stone))
      .join(" ");

    console.log(stones);
  }
  return stones.split(" ").length;
};

const rule2 = (input) => {
  let left = input.substring(0, input.length / 2);
  let right = input.substring(input.length / 2, input.length);
  right = right.replace(/^0+/, "");

  if (right.length === 0) {
    right = "0";
  }

  return left + " " + right;
};

const changeStone = (stone) => {
  // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
  if (stone === "0") {
    return "1";
  }

  //   If the stone is engraved with a number that has an even number of digits, it is replaced by two stones.
  //  The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
  if (stone.length % 2 === 0) {
    return rule2(stone);
  }
  //If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
  return (+stone * 2024).toString();
};

console.log(blink(25));

console.timeEnd("elapsed");
