import { log } from "console";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin, // where it listens (your keyboard)
  output: process.stdout, // where it writes (your terminal)
});

// rl.question("Enter a city: ", (answer) => {
//   console.log(`You entered: ${answer}`);
//   rl.close(); // always close it when you're done
// });

function askQuestion(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  const city = await askQuestion("Enter a city: ");
  return city;
}
main();

async function fetchData() {
  const response = await fetch("");
}
