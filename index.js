// TODO: Include packages needed for this application
import colors from "colors";
import inquirer from "inquirer";

colors.setTheme({
  silly: "rainbow",
  input: "grey",
  verbose: "cyan",
  prompt: "grey",
  info: "green",
  data: "grey",
  help: "cyan",
  warn: "yellow",
  debug: "blue",
  error: "red",
});

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "projectName",
    message: colors.verbose("What is your project's name?"),
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(colors.debug(answers.projectName));
});

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
  console.log("INIT");
}

// Function call to initialize app
init();
