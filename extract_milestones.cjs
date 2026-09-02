const fs = require('fs');
const content = fs.readFileSync('src/data/portfolioData.ts', 'utf8');

const startIndex = content.indexOf('export const CAREER_MILESTONES');
const endIndex = content.indexOf('export const BLOG_POSTS'); // The next export

if (startIndex !== -1 && endIndex !== -1) {
  const milestonesText = content.substring(startIndex, endIndex);
  fs.writeFileSync('career_journey_v10.txt', milestonesText, 'utf8');
  console.log("Successfully saved to career_journey_v10.txt");
} else {
  console.log("Could not find bounds");
}
