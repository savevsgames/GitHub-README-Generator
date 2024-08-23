// TODO: Include packages needed for this application
import colors from "colors";
import inquirer from "inquirer";
import fs from "fs";
import renderBadge from "./utils/renderBadge.js";

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
const titleQuestion = [
  {
    type: "input",
    name: "projectTitle",
    message: colors.info(
      "Enter Project Title: \n NOTE - The title of your project should be clear and descriptive, giving readers an immediate understanding of what the project is about."
    ),
  },
];
const descriptionQuestion = [
  {
    type: "input",
    name: "projectDescription",
    message: colors.info(
      "Enter Project Description: \n NOTE - A brief overview of the project, explaining its purpose, features, and what problems it solves. This section should engage readers and provide context."
    ),
  },
];
const installQuestion = [
  {
    type: "editor",
    name: "projectInstallInstructions",
    message: colors.info(
      "Enter Installation Instructions: \n NOTE - Detailed steps on how to install and set up the project. This should include any dependencies, configuration requirements, and troubleshooting tips. \n * - This will open an editor for you to enter instructions. Enter your instructions, then save the file and close it to return to the CLI."
    ),
    waitUserInput: true,
  },
];

const usageQuestion = [
  {
    type: "editor",
    name: "projectUsageInstructions",
    message: colors.info(
      "Enter Usage Instructions: \n NOTE - Examples of how to use the project, including code snippets and any relevant commands. This section helps users understand how to interact with your project effectively. \n * - This will open an editor for you to enter instructions. Enter your instructions, then save the file and close it to return to the CLI."
    ),
    waitUserInput: true,
  },
];
const contributionGuidelinesQuestion = [
  {
    type: "editor",
    name: "projectContributingGuidelines",
    message: colors.info(
      "Enter Contributing Guidelines: \n NOTE - Instructions for how others can contribute to the project, including coding standards, pull request processes, and any other relevant guidelines."
    ),
    waitUserInput: true,
  },
];
const licenseInformationQuestion = [
  {
    type: "list",
    name: "projectLicenseInformation",
    message: colors.info(
      "Enter License Information: \n NOTE - Specify the license under which the project is distributed. This informs users of their rights regarding the use and modification of the project."
    ),
    choices: ["MIT", "Apache 2.0"],
  },
];
const acknowledgementsQuestion = [
  {
    type: "input",
    name: "projectAcknowledgments",
    message: colors.info(
      "Enter Credits and Acknowledgments: \n NOTE - Recognition of contributors, libraries, or resources that were instrumental in the project’s development."
    ),
  },
];
const contactQuestion = [
  {
    type: "input",
    name: "projectContact",
    message: colors.info(
      "Enter Contact Information: \n NOTE - Provide details on how users can reach out for support or questions, such as an email address or links to social media."
    ),
  },
];
const resourcesQuestion = [
  {
    type: "editor",
    name: "projectResources",
    message: colors.info(
      "Enter Additional Resources: \n NOTE - Links to documentation, tutorials, or related projects that may help users further understand or utilize the project."
    ),
    waitUserInput: true,
  },
];
const badgesQuestion = [
  {
    type: "input",
    name: "label",
    message: colors.info("Enter badge label text"),
    default: "BADGE",
  },
  {
    type: "input",
    name: "message",
    message: colors.info("Enter badge message"),
    default: "Message",
  },
  {
    type: "list",
    name: "labelColor",
    message: colors.info("Pick LABEL background color."),
    choices: [
      "brightgreen",
      "green",
      "yellow",
      "yellowgreen",
      "orange",
      "red",
      "blue",
      "grey",
      "lightgrey",
      "gray",
      "lightgray",
      "critical",
      "important",
      "success",
      "informational",
      "inactive",
    ],
    default: "blue",
  },
  {
    type: "list",
    name: "color",
    message: colors.info("Pick MESSAGE background color."),
    choices: [
      "brightgreen",
      "green",
      "yellow",
      "yellowgreen",
      "orange",
      "red",
      "blue",
      "grey",
      "lightgrey",
      "gray",
      "lightgray",
      "critical",
      "important",
      "success",
      "informational",
      "inactive",
    ],
    default: "white",
  },
  {
    type: "list",
    name: "style",
    message: colors.info("Choose a badge style:"),
    choices: ["plastic", "flat", "flat-square", "for-the-badge", "social"],
    default: "flat",
  },
];

// Functions - prompt the user and then trigger the next questions
function promptTitleQuestion() {
  inquirer.prompt(titleQuestion).then((titleAnswer) => {
    const answers = {};
    promptDescriptionQuestion({ ...answers, ...titleAnswer });
  });
}

function promptDescriptionQuestion(answers) {
  inquirer.prompt(descriptionQuestion).then((descriptionAnswer) => {
    promptInstallQuestion({ ...answers, ...descriptionAnswer });
  });
}

function promptInstallQuestion(answers) {
  inquirer.prompt(installQuestion).then((installAnswer) => {
    promptUsageQuestion({ ...answers, ...installAnswer });
  });
}

function promptUsageQuestion(answers) {
  inquirer.prompt(usageQuestion).then((usageAnswer) => {
    promptContributionGuidelinesQuestion({ ...answers, ...usageAnswer });
  });
}

function promptContributionGuidelinesQuestion(answers) {
  inquirer
    .prompt(contributionGuidelinesQuestion)
    .then((contributionGuidelinesAnswer) => {
      promptLicenseInformationQuestion({
        ...answers,
        ...contributionGuidelinesAnswer,
      });
    });
}

function promptLicenseInformationQuestion(answers) {
  inquirer
    .prompt(licenseInformationQuestion)
    .then((licenseInformationAnswer) => {
      promptAcknowledgementsQuestion({
        ...answers,
        ...licenseInformationAnswer,
      });
    });
}

function promptAcknowledgementsQuestion(answers) {
  inquirer.prompt(acknowledgementsQuestion).then((acknowledgementsAnswer) => {
    promptContactQuestion({ ...answers, ...acknowledgementsAnswer });
  });
}

function promptContactQuestion(answers) {
  inquirer.prompt(contactQuestion).then((contactAnswer) => {
    promptResourcesQuestion({ ...answers, ...contactAnswer });
  });
}

function promptResourcesQuestion(answers) {
  inquirer.prompt(resourcesQuestion).then((resourcesAnswer) => {
    promptBadgesQuestion({ ...answers, ...resourcesAnswer });
  });
}

function promptBadgesQuestion(answers) {
  inquirer.prompt(badgesQuestion).then((badgesAnswers) => {
    console.log(badgesAnswers);
    const newBadge = renderBadge(badgesAnswers);
    // console.log(newBadge);
    // Do something with the newBadge Object and ...answers
    writeToFile("badge.svg", newBadge);
    const finalAnswers = { ...answers };
    document.getElementById("badge").innerHTML = finalAnswers;
    writeToFile("README.md", finalAnswers);
  });
}

// Function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(`./output/${fileName}`, JSON.stringify(data), () => {
    console.log("File Created Successfully!");
  });
}

// TODO: Create a function to initialize app
function init() {
  console.log("Welcome to Greg Barker's GitHub CLI README maker!");
  console.log(logo.rainbow);
  promptTitleQuestion();
}

// Function call to initialize app
init();
