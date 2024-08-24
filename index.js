// TODO: Include packages needed for this application
import colors from "colors";
import inquirer from "inquirer";
import { promises as fs } from "fs";
import utils from "./utils/generateMarkdown.js";
import generateMarkdown from "./utils/generateMarkdown.js";

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

const logo = `
            MADE BY:
     ____                  
    / ___|_  __  ___  ____  
    | |  _| '__|/ _ \ / _  | 
    | |_| | |  |  __/ (_| | 
    |_____|_|  |____|\___, | 
                     ___| | 
                     |____/ 
                         `;

// Questions for User Input
const questions = [
  {
    type: "input",
    name: "projectTitle",
    message: colors.info(
      "Enter Project Title: \n NOTE - The title of your project should be clear and descriptive, giving readers an immediate understanding of what the project is about."
    ),
    waitUserInput: true,
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        return false;
      }
    },
  },

  {
    type: "editor",
    name: "projectDescription",
    message: colors.info(
      "Enter Project Description: \n NOTE - A brief overview of the project, explaining its purpose, features, and what problems it solves. This section should engage readers and provide context."
    ),
    waitUserInput: true,
  },

  {
    type: "editor",
    name: "projectInstallInstructions",
    message: colors.info(
      "Enter Installation Instructions: \n NOTE - Detailed steps on how to install and set up the project. This should include any dependencies, configuration requirements, and troubleshooting tips. \n * - This will open an editor for you to enter instructions. Enter your instructions, then save the file and close it to return to the CLI."
    ),
    waitUserInput: true,
  },

  {
    type: "editor",
    name: "projectUsageInstructions",
    message: colors.info(
      "Enter Usage Instructions: \n NOTE - Examples of how to use the project, including code snippets and any relevant commands. This section helps users understand how to interact with your project effectively. \n * - This will open an editor for you to enter instructions. Enter your instructions, then save the file and close it to return to the CLI."
    ),
    waitUserInput: true,
  },

  {
    type: "editor",
    name: "projectContributingGuidelines",
    message: colors.info(
      "Enter Contributing Guidelines: \n NOTE - Instructions for how others can contribute to the project, including coding standards, pull request processes, and any other relevant guidelines."
    ),
    waitUserInput: true,
  },

  {
    type: "list",
    name: "projectLicenseInformation",
    message: colors.info(
      "Enter License Information: \n NOTE - Specify the license under which the project is distributed. This informs users of their rights regarding the use and modification of the project."
    ),
    choices: [
      "Apache License 2.0",
      "GNU General Public License v3.0",
      "MIT License",
      'BSD 2-Clause "Simplified" License',
      'BSD 3-Clause "New" or "Revised" License',
      "Boost Software License 1.0",
      "Creative Commons Zero v1.0 Universal",
      "Eclipse Public License 2.0",
      "GNU Affero General Public License v3.0",
      "GNU General Public License v2.0",
      "GNU Lesser General Public License v2.1",
      "Mozilla Public License 2.0",
      "The Unlicense",
      "NO SPECIFIED LICENSE",
    ],
    waitUserInput: true,
  },

  {
    type: "editor",
    name: "projectAcknowledgments",
    message: colors.info(
      "Enter Credits and Acknowledgments: \n NOTE - Recognition of contributors, libraries, or resources that were instrumental in development."
    ),
    waitUserInput: true,
  },

  {
    type: "input",
    name: "projectContactGithub",
    message: colors.info("Enter your GitHub username: "),
    waitUserInput: true,
  },

  {
    type: "input",
    name: "projectContactEmail",
    message: colors.info("Enter your email: "),
    waitUserInput: true,
  },

  {
    type: "editor",
    name: "projectContactAdditional",
    message: colors.info(
      "Enter instructions for users who wish to ask you questions: "
    ),
    waitUserInput: true,
  },

  {
    type: "editor",
    name: "projectResources",
    message: colors.info(
      "Enter Additional Resources: \n NOTE - Links to documentation, tutorials, or related projects that may help users further understand or utilize the project."
    ),
    waitUserInput: true,
  },
];

// Function to prompt users with questionaire
function promptQuestions() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(questions)
      .then((answers) => {
        resolve(answers); // Resolve the promise by completing user input
      })
      .catch((error) => {
        console.error(error);
        reject(error); // Reject if user does not complete
      });
  });
}

// Function to write README file
async function writeToFile(fileName, data) {
  await fs.writeFile(fileName, data);
  return "File written Successfully!";
}
// async function to handle prompt promise
async function asyncQuestionaire() {
  try {
    const questionaireResponses = await promptQuestions();
    const markdown = utils.generateMarkdown(questionaireResponses);
    await writeToFile("README.md", markdown);
    console.log("Markdown created successfully:", markdown);
  } catch (error) {
    console.error(error);
  }
}

// TODO: Create a function to initialize app
function init() {
  console.log("Welcome to Greg Barker's GitHub CLI README maker!");
  console.log(logo.rainbow);
  // call function to prompt user
  asyncQuestionaire();
}

// Function call to initialize app
init();
