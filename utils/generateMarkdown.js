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
    default:
      return ""; // Return an empty string if the license is not recognized
  }
}

function renderProjectBadgeLink(badge_alt) {
  const link = "../output/project_badge.svg";
  const badgeAlt = badge_alt;
  return `![${badgeAlt}](${link})`;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  const link = "./../LICENSE";
  const linkTitle = license;
  return `[${linkTitle}](${link})`;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  return `LICENSE INFO: This repository is covered under ${license}.`;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown() {
  const data = readFile("README_OBJ.json", "utf8", (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log("File read ruccessfully!");
    }
  });
  // Clean the data object properties
  const cleanedData = {
    projectTitle: data.projectTitle.trim(),
    projectDescription: data.projectDescription.trim(),
    projectInstallInstructions: data.projectInstallInstructions.trim(),
    projectUsageInstructions: data.projectUsageInstructions.trim(),
    projectContributingGuidelines: data.projectContributingGuidelines.trim(),
    projectLicenseInformation: data.projectLicenseInformation.trim(),
    projectAcknowledgments: data.projectAcknowledgments.trim(),
    projectContact: data.projectContact.trim(),
    projectResources: data.projectResources.trim(),
  };
  const projectBadgeSvgLink = renderProjectBadgeLink(cleanedData.projectTitle);
  const licenseLink = renderLicenseLink(cleanedData.projectLicenseInformation);
  const licenseBadge = renderLicenseBadge(
    cleanedData.projectLicenseInformation
  );
  const licenseInfo = renderLicenseSection(
    cleanedData.projectLicenseInformation
  );
  return `
# ${cleanedData.projectTitle}
## ${projectBadgeSvgLink}

## Description

${cleanedData.projectDescription}

---

## Installation Instructions

${cleanedData.projectInstallInstructions}

---

## Usage Instructions

${cleanedData.projectUsageInstructions}

---

## Contributing Guidelines

${cleanedData.projectContributingGuidelines}

---

## License Information

${cleanedData.projectLicenseInformation}
${licenseBadge} ${licenseLink}
### ${licenseInfo}
 
---

## Acknowledgments

${cleanedData.projectAcknowledgments}

---

## Contact

${cleanedData.projectContact}

---

## Resources

${cleanedData.projectResources}

---
`.trim(); // in case there is any other whitespace
}

export default {
  generateMarkdown,
  renderLicenseSection,
  renderLicenseLink,
  renderLicenseBadge,
  renderProjectBadgeLink,
};
