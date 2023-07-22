// Calculates the number of items per page
export function countPage() {
  return window.innerWidth < 768 ? 9 : 12;
}

/**
 * Groups an array into chunks of a specified size.
 *
 *  array - The array to be grouped into chunks.
 *  chunkSize - The size of each chunk(Part).
 * {Object} An object containing the grouped chunks, with chunk numbers as keys.
 */
export function groupArrayIntoChunks(array, chunkSize) {
  const groupedChunks = {};
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunkNumber = Math.floor(i / chunkSize) + 1;
    groupedChunks[chunkNumber] = array.slice(i, i + chunkSize);
  }
  return groupedChunks;
}
