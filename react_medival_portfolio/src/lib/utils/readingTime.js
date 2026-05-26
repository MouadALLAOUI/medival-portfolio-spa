/**
 * Calculates reading time for a given text.
 * Average reading speed is 200-250 words per minute.
 * @param {string} text - The content to analyze
 * @returns {number} - Estimated minutes to read
 */
export const calculateReadingTime = (text) => {
  if (!text) return 0;
  const wordsPerMinute = 225;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
};
