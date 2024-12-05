console.time("aoc");
const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf8");

const rows = data.split("\n");

let total = 0;
const rules = rows.slice(0, rows.indexOf(""));
const updates = rows.slice(rows.indexOf(""), rows.length);

const ruleNumbers = [];

rules.forEach((r) => {
  const [first, second] = r.split("|");
  ruleNumbers.push(first);
  ruleNumbers.push(second);
});

const rulesSet = new Set(ruleNumbers);


for (i = 0; i < updates.length; i++) {
  const r = updates[i];
  const numbers = r.split(",").filter(n => rulesSet.has(n));


  let isCorrect = false;

   for(j=0;j<numbers.length-1;j++) {
     if(rules.indexOf(`${numbers[j]}|${numbers[j+1]}`) === -1) {
      isCorrect = false
      break;
    } else {
      isCorrect = true
    }
   }

   if(!isCorrect && numbers.length > 0) {
     numbers.sort((a,b) => {
        if(rules.includes(`${a}|${b}`)) {
          return 1;
        } else {
          return -1;
        }
     })
    total += Number(numbers[Math.round((numbers.length - 1) / 2)]);
   } 
  
}






console.log(total);

console.timeEnd("aoc");
