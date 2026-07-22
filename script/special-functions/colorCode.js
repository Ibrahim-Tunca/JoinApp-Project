const CONTACT_COLOR_TYPES = [
  "ocker",
  "yellow",
  "orange",
  "red",
  "salmon",
  "creme",
  "lila",
  "lavender",
  "violette",
  "pink",
  "magenta",
  "blue",
  "turquoise",
  "babyblue",
  "lime",
];


/**
 * Returns a random integer between 0 and the given maximum value.
 *
 * @param {number} max - The upper boundary for the random number.
 * @returns {number} A random integer from 0 up to, but not including, max.
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


/**
 * Returns a random contact color type from the predefined color list.
 *
 * @returns {string} A random color class name for a contact avatar.
 */
function getContactColorType() {
  return CONTACT_COLOR_TYPES[getRandomInt(CONTACT_COLOR_TYPES.length)];
}