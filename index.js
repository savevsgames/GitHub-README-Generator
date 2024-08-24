// TODO: Include packages needed for this application
import colors from "colors";
import inquirer from "inquirer";
import fs from "fs";
import utils from "./utils/generateMarkdown.js";

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
        console.log("You must enter a project title.");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "projectDescription",
    message: colors.info(
      "Enter Project Description: \n NOTE - A brief overview of the project, explaining its purpose, features, and what problems it solves. This section should engage readers and provide context."
    ),
    waitUserInput: true,
  },

  {
    type: "input",
    name: "projectInstallInstructions",
    message: colors.info(
      "Enter Installation Instructions: \n NOTE - Detailed steps on how to install and set up the project. This should include any dependencies, configuration requirements, and troubleshooting tips. \n * - This will open an editor for you to enter instructions. Enter your instructions, then save the file and close it to return to the CLI."
    ),
    waitUserInput: true,
  },

  {
    type: "input",
    name: "projectUsageInstructions",
    message: colors.info(
      "Enter Usage Instructions: \n NOTE - Examples of how to use the project, including code snippets and any relevant commands. This section helps users understand how to interact with your project effectively. \n * - This will open an editor for you to enter instructions. Enter your instructions, then save the file and close it to return to the CLI."
    ),
    waitUserInput: true,
  },

  {
    type: "input",
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
    ],
    waitUserInput: true,
  },

  {
    type: "input",
    name: "projectAcknowledgments",
    message: colors.info(
      "Enter Credits and Acknowledgments: \n NOTE - Recognition of contributors, libraries, or resources that were instrumental in development."
    ),
    waitUserInput: true,
  },

  {
    type: "input",
    name: "projectContact",
    message: colors.info(
      "Enter Contact Information: \n NOTE - Provide details on how users can reach out for support or questions, such as an email address or links to social media."
    ),
    waitUserInput: true,
  },

  {
    type: "input",
    name: "projectResources",
    message: colors.info(
      "Enter Additional Resources: \n NOTE - Links to documentation, tutorials, or related projects that may help users further understand or utilize the project."
    ),
    waitUserInput: true,
  },
];

// Function to write README file
function writeToFile(fileName, data) {
  if (typeof data === String) {
    fs.writeFile(`./output/${fileName}`, data, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(typeof data, fileName, "File Created Successfully!");
      }
    });
  } else {
    fs.writeFile(`./output/${fileName}`, JSON.stringify(data), (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(typeof data, fileName, "File Created Successfully!");
      }
    });
  }
}

// TODO: Create a function to initialize app
function init() {
  console.log("Welcome to Greg Barker's GitHub CLI README maker!");
  console.log(logo.rainbow);
  inquirer.prompt(questions);
}

// Function call to initialize app
init();
