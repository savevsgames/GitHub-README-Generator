// TODO: Include packages needed for this application
import colors from "colors";
import inquirer from "inquirer";
import { promises as fs } from "fs";
import { generateMarkdown, renderBadge } from "./utils/generateMarkdown.js";

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

// Question to prompt which test to take
const startingQuestion = [
  {
    type: "list",
    name: "testVersion",
    message: "Do you want the SIMPLE template or the ADVANCED template?",
    choices: ["simple", "advanced"],
    waitUserInput: true,
  },
];
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
// Questions for simple version
const simpleQuestions = [
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
    type: "input",
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
    type: "input",
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
    type: "input",
    name: "projectResources",
    message: colors.info(
      "Enter Additional Resources: \n NOTE - Links to documentation, tutorials, or related projects that may help users further understand or utilize the project."
    ),
    waitUserInput: true,
  },
];
// CONFIRM QUESTION
const confirmQuestion = [
  {
    type: "confirm",
    name: "makeCustomBadges",
    message:
      "Do you want to make custom badges to add to your repo? (just hit enter for YES)?",
    default: true,
  },
];

// BADGES QUESTIONAIRE
const badgeQuestions = [
  {
    type: "input",
    name: "label",
    message: colors.info("(Optional) Badge label"),
    waitUserInput: true,
    default: "GitHub",
  },
  {
    type: "input",
    name: "message",
    message: colors.info("(Required) Badge message"),
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
    type: "list",
    name: "labelColor",
    message: colors.info("(Optional) Label color"),
    waitUserInput: true,
    default: "green",
    choices: [
      "bgBlack",
      "bgRed",
      "bgGreen",
      "bgYellow",
      "bgBlue",
      "bgMagenta",
      "bgCyan",
      "bgWhite",
      "bgGray",
      "bgBrightRed",
      "bgBrightGreen",
      "bgBrightYellow",
      "bgBrightBlue",
      "bgBrightMagenta",
      "bgBrightCyan",
      "bgBrightWhite",
    ],
  },
  {
    type: "list",
    name: "color",
    message: colors.info("(Optional) Message color"),
    waitUserInput: true,
    default: "white",
    choices: [
      "bgBlack",
      "bgRed",
      "bgGreen",
      "bgYellow",
      "bgBlue",
      "bgMagenta",
      "bgCyan",
      "bgWhite",
      "bgGray",
      "bgBrightRed",
      "bgBrightGreen",
      "bgBrightYellow",
      "bgBrightBlue",
      "bgBrightMagenta",
      "bgBrightCyan",
      "bgBrightWhite",
    ],
  },
  {
    type: "list",
    name: "style",
    message: colors.info(
      "(Optional) One of: 'plastic', 'flat', 'flat-square', 'for-the-badge' or 'social'"
    ),
    waitUserInput: true,
    default: "flat",
    choices: ["plastic", "flat", "flat-square", "for-the-badge", "social"],
  },
  {
    type: "confirm",
    name: "makeAnotherBadge",
    message: "Do you want to make another badge? (just hit enter for YES)?",
    default: true,
  },
];
// Function to determine which quiz a user wants to use
function promptQuizType() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(startingQuestion)
      .then((startingQuestionAnswer) => {
        resolve(startingQuestionAnswer); // Resolve the promise by completing user input
      })
      .catch((error) => {
        console.error(error);
        reject(error); // Reject if user does not complete
      });
  });
}

// Function to determine which quiz a user wants to use
function promptSimpleQuiz() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(simpleQuestions)
      .then((simpleAnswers) => {
        resolve(simpleAnswers); // Resolve the promise by completing user input
      })
      .catch((error) => {
        console.error(error);
        reject(error); // Reject if user does not complete
      });
  });
}

// Function to prompt users with ADVANCED questionaire
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

// Function to prompt users with 2nd questionaire to add more badges
async function confirmMoreBadgesQuestion() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(confirmQuestion)
      .then((confirmAnswer) => {
        console.log(
          "Confirmation Answer: ",
          typeof confirmAnswer,
          confirmAnswer
        );
        resolve(confirmAnswer); // Resolve the promise by completing user input
      })
      .catch((error) => {
        console.error(error);
        reject(error); // Reject if user does not complete
      });
  });
}

// Function to add more badges
async function promptBadgeQuestions() {
  const badgeArray = [];
  const badgeFileNameArray = [];
  return new Promise((resolve, reject) => {
    async function promptInquirer() {
      inquirer
        .prompt(badgeQuestions)
        .then((badgeAnswers) => {
          badgeArray.push(badgeAnswers);
          if (badgeAnswers.makeAnotherBadge) {
            // instead of just writing the badge array - convert to svg first and write individual files
            const fileName = `additional_badge_${[badgeArray.length]}.svg`;
            badgeFileNameArray.push(fileName);
            const svgBadge = renderBadge(badgeAnswers);
            writeToFile(fileName, svgBadge);
            promptInquirer();
          } else {
            // Do the last badge
            const fileName = `additional_badge_${[badgeArray.length]}.svg`;
            badgeFileNameArray.push(fileName);
            const svgBadge = renderBadge(badgeAnswers);
            writeToFile(fileName, svgBadge);
            // Write the whole object to a file for confirmation of structure
            writeToFile(`additional_badges.json`, JSON.stringify(badgeArray));

            function getBadgeListFileMarkdown(fileList) {
              let markdownBadgeList = "";
              // Loop through entries in badgeFile and add them to the markdownBadgeList
              for (let i = 0; i < fileList.length; i++) {
                let badgeFile = fileList[i];
                markdownBadgeList += `![Badge](${badgeFile}) `;
              }
              return markdownBadgeList;
            }

            const badgeMarkdownFinal =
              getBadgeListFileMarkdown(badgeFileNameArray);

            resolve(badgeMarkdownFinal); // Resolve the promise by completing user input
          }
        })
        .catch((error) => {
          console.error(error);
          reject(error); // Reject if user does not complete
        });
    }
    promptInquirer();
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
    // Starting question will determine which quiz is taken:
    console.log("Starting questionaire type check....");
    const quizType = await promptQuizType();
    console.log("Questionnaire type check completed.");

    let simpleResponses;
    let questionaireResponses;

    if (quizType.testVersion === "simple") {
      console.log("Starting simple questionnaire...");
      simpleResponses = await promptSimpleQuiz();
      console.log("Simple questionnaire completed.");
    } else {
      console.log("Starting main questionnaire...");
      questionaireResponses = await promptQuestions();
      console.log("Main questionnaire completed.");
    }
    // Add Badges
    console.log("Starting additional badges confirmation....");
    const confirmMoreBadges = await confirmMoreBadgesQuestion();
    console.log("Additional badges confirmation completed....");
    let badgeQuestionaireResponses;
    if (confirmMoreBadges.makeCustomBadges) {
      console.log("Starting badge questionnaire...");
      badgeQuestionaireResponses = await promptBadgeQuestions();
      console.log("Badge questionnaire completed.");

      console.log("Checking if all badge promises are resolved...");
      if (Array.isArray(badgeQuestionaireResponses)) {
        await Promise.all(badgeQuestionaireResponses);
      }

      console.log("All badge promises confirmed resolved.");
    }

    // Generate Markdown
    let markdown = "";
    console.log("Generating markdown...");
    if (quizType.testVersion === "simple") {
      markdown = generateMarkdown(simpleResponses, badgeQuestionaireResponses);
      console.log("Simple markdown generated.");

      console.log("Writing simple markdown file...");
      await writeToFile("README.md", markdown);
      console.log("File written successfully.");
    } else {
      markdown = generateMarkdown(
        questionaireResponses,
        badgeQuestionaireResponses
      );
      console.log("Markdown generated.");

      console.log("Writing file...");
      await writeToFile("README.md", markdown);
      console.log("File written successfully.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
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
