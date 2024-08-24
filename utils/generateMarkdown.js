import { makeBadge, ValidationError } from "badge-maker";
// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  const format = {
    label: "license", // (Optional) Badge label
    message: license, // (Required) Badge message
    labelColor: "#333333", // (Optional) Label color
    color: "#202c55", // (Optional) Message color
    style: "flat", // (Optional) style
  };
  try {
    const badge = makeBadge(format);
    return badge;
    // const editedBadge = JSON.stringify(badge);
    // return JSON.parse(editedBadge);
  } catch (e) {
    console.log(ValidationError, e); //
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
  const link = "./LICENSE.md";
  const linkTitle = license;
  return `[${linkTitle}](${link})`;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const projectBadgeSvgLink = renderProjectBadgeLink(data.projectLinkTitle);
  return `# ${data.titleAnswer}

  ${projectBadgeSvgLink}
  
`;
}

export default {
  generateMarkdown,
  renderLicenseSection,
  renderLicenseLink,
  renderLicenseBadge,
  renderProjectBadgeLink,
};
