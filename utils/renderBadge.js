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
    console.log("Badge Created -> ", typeof badge);
    return badge;
    // const editedBadge = JSON.stringify(badge);
    // return JSON.parse(editedBadge);
  } catch (e) {
    console.log(ValidationError, e); //
  }
}

export default renderBadge;
