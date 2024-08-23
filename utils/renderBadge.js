import { makeBadge, ValidationError } from "badge-maker";

function renderBadge(config) {
  const format = {
    label: config.label, // (Optional) Badge label
    message: config.message, // (Required) Badge message
    labelColor: config.labelColor, // (Optional) Label color
    color: config.color, // (Optional) Message color

    // (Optional) One of: 'plastic', 'flat', 'flat-square', 'for-the-badge' or 'social'
    // Each offers a different visual design.
    style: config.style,
  };
  try {
    const badge = makeBadge(format);
    const editedBadge = JSON.stringify(mapValidCharacters(badge));
    return JSON.parse(editedBadge);
  } catch (e) {
    console.log("ValidationError: Field `message` is required", e); //
  }

  function removeLineBreaks(svgString) {
    return svgString
      .replace(/\n/g, "")
      .replace(/\r/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function mapValidCharacters(inputStr) {
    // Define the set of valid characters that CAN be used in the svg
    const validChars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>,./?;:'\"[]{}|`~!@#$%^&*()-_=+ ";

    // Initialize an empty string to store the mapped result
    let mappedStr = "";

    // Iterate over each character in the input string
    for (let char of inputStr) {
      // If the character is in the set of valid characters, add it to the mapped string
      if (validChars.includes(char)) {
        mappedStr += char;
      }
    }

    return mappedStr;
  }
}

export default renderBadge;
