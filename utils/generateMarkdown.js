import { makeBadge } from "badge-maker";
import svg64 from "svg64";

function renderBadge(config) {
  // function to convert svg to base64
  function convertSvgToBase64(svgString) {
    // svg64 expects a valid SVG string
    const base64 = svg64(svgString);
    return base64;
  }

  const format = {
    label: config.label, // (Optional) Badge label
    message: config.message, // (Required) Badge message
    labelColor: config.labelColor, // (Optional) Label color
    color: config.color, // (Optional) Message color
    style: config.style, // (Optional) One of: 'plastic', 'flat', 'flat-square', 'for-the-badge' or 'social'
  };
  // console.log("Badge info before badge: ", typeof format, format);
  try {
    const badge = makeBadge(format);
    // console.log("Badge Created -> ", typeof badge, badge);
    // const base64Badge = convertSvgToBase64(badge);
    // console.log("BASE64Badge Created -> ", typeof base64Badge, base64Badge);
    return badge;
  } catch (error) {
    console.error("ValidationError", error);
  }
}

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string

function renderLicenseBadge(license) {
  switch (license) {
    case "Apache License 2.0":
      return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
    case "GNU General Public License v3.0":
      return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
    case "MIT License":
      return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
    case 'BSD 2-Clause "Simplified" License':
      return `[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`;
    case 'BSD 3-Clause "New" or "Revised" License':
      return `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
    case "Boost Software License 1.0":
      return `[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`;
    case "Creative Commons Zero v1.0 Universal":
      return `[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)`;
    case "Eclipse Public License 2.0":
      return `[![License](https://img.shields.io/badge/License-EPL_2.0-red.svg)](https://opensource.org/licenses/EPL-2.0)`;
    case "GNU Affero General Public License v3.0":
      return `[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)`;
    case "GNU General Public License v2.0":
      return `[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)`;
    case "GNU Lesser General Public License v2.1":
      return `[![License: LGPL v2.1](https://img.shields.io/badge/License-LGPL_v2.1-blue.svg)](https://www.gnu.org/licenses/lgpl-2.1)`;
    case "Mozilla Public License 2.0":
      return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
    case "The Unlicense":
      return `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`;
    case "NO SPECIFIED LICENSE":
      return `[![No Specified License](https://img.shields.io/badge/license-Not%20Specified-lightgrey.svg)](https://shields.io/)`;
    default:
      return ""; // Return an empty string if the license is not recognized
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  let link = "";
  if (license === "NO SPECIFIED LICENSE") {
    return "This repository has no specified license.";
  } else {
    link = "./LICENSE";
    // const linkTitle = license;
    return `[LICENSE](${link})`;
  }
}

// Function that returns any additional info for users asking questions
// If there is no info, return an empty string
function renderAdditionalQuestions(info) {
  if (!info) {
    return "";
  } else {
    return info;
  }
}

// Function that returns the github profile link
// If there is no profile, return an empty string
function renderGithubProfileLink(profile) {
  let link = "";
  if (!profile) {
    return "";
  } else {
    link = `https://github.com/${profile}`;
    const linkTitle = profile;
    return `GitHub Profile: [${linkTitle}](${link})`;
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license) {
    return `This repository is covered under ${license}.`;
  } else {
    return "This repository has no specified license.";
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data, badgeData) {
  let badgeList;
  badgeData ? (badgeList = badgeData) : (badgeList = []);
  // console.log("badgeData", typeof badgeData, badgeData);
  // console.log("badgeList", typeof badgeList, badgeList);

  const cleanedData = {
    projectTitle: data.projectTitle.trim(),
    projectDescription: data.projectDescription.trim(),
    projectInstallInstructions: data.projectInstallInstructions.trim(),
    projectUsageInstructions: data.projectUsageInstructions.trim(),
    projectContributingGuidelines: data.projectContributingGuidelines.trim(),
    projectLicenseInformation: data.projectLicenseInformation.trim(),
    projectAcknowledgments: data.projectAcknowledgments.trim(),
    projectContactGithub: data.projectContactGithub.trim(),
    projectContactEmail: data.projectContactEmail.trim(),
    projectContactAdditional: data.projectContactAdditional.trim(),
    projectResources: data.projectResources.trim(),
  };

  // extract neccessary info first
  const licenseLink = renderLicenseLink(cleanedData.projectLicenseInformation);
  const licenseBadge = renderLicenseBadge(
    cleanedData.projectLicenseInformation
  );
  const licenseInfo = renderLicenseSection(
    cleanedData.projectLicenseInformation
  );
  const githubProfile = renderGithubProfileLink(
    cleanedData.projectContactGithub
  );
  const additionalQuestions = renderAdditionalQuestions(
    cleanedData.projectContactAdditional
  );

  // Title
  const titleInfo = `# ${cleanedData.projectTitle}

${licenseBadge} ${badgeList}
`;
  // Table of Contents
  const tocInfo = `## Table of Contents

1. [Description](#description)
2. [Installation Instructions](#installation-instructions)
3. [Usage Instructions](#usage-instructions)
4. [Contributing Guidelines](#contributing-guidelines)
5. [License Information](#license-information)
6. [Acknowledgments](#acknowledgments)
7. [Questions](#questions)
8. [Resources](#resources)
  `;
  // Description
  const descriptionInfo = `## Description

${cleanedData.projectDescription}

![Readme Generator Screenshot](./assets/images/readme_generator_screenshot.png)
`;
  // InstallInstructions
  const installationInfo = `## Installation Instructions

${cleanedData.projectInstallInstructions}
`;
  // UsageInstructions
  const usageInfo = `## Usage Instructions

${cleanedData.projectUsageInstructions}
`;
  // Contributing Guidelines
  const contributionInfo = `## Contributing Guidelines

${cleanedData.projectContributingGuidelines}
`;
  // LicenseInformation
  const licenseMarkdownInfo = `## License Information

### ${cleanedData.projectLicenseInformation}

${licenseLink} ${licenseInfo}
`;
  // Ancknowledgements
  const acknowledgementInfo = `## Acknowledgments

${cleanedData.projectAcknowledgments}
`;
  // Questions
  const questionsInfo = `## Questions

${githubProfile}\n
Email: ${cleanedData.projectContactEmail}

${additionalQuestions}
`;
  // Resources
  const resourcesInfo = `## Resources

${cleanedData.projectResources}`;

  // build the markdown file with all the array values that exist.

  return `${titleInfo}
${tocInfo}
${descriptionInfo}
${installationInfo}
${usageInfo}
${contributionInfo}
${licenseMarkdownInfo}
${acknowledgementInfo}
${questionsInfo}
${resourcesInfo}`;
}

export { generateMarkdown };

export { renderBadge };
