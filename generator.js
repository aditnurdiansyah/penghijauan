const { execSync } = require('child_process');

// Usage: node generator.js [--start YYYY-MM-DD] [--end YYYY-MM-DD] [--min 3] [--max 10] [--email user@example.com] [--push]
const args = process.argv.slice(2);
function getArg(flag, defaultValue) {
  const index = args.indexOf(flag);
  if (index !== -1 && args[index + 1]) return args[index + 1];
  return defaultValue;
}

const shouldPush = args.includes('--push');
const minCommits = parseInt(getArg('--min', '3'), 10);
const maxCommits = parseInt(getArg('--max', '10'), 10);
const gitEmail = getArg('--email', 'tumbaldiscord292@gmail.com');

const today = new Date();
const oneYearAgo = new Date();
oneYearAgo.setFullYear(today.getFullYear() - 1);

const startDateStr = getArg('--start', oneYearAgo.toISOString().split('T')[0]);
const endDateStr = getArg('--end', today.toISOString().split('T')[0]);

const startDate = new Date(startDateStr);
const endDate = new Date(endDateStr);

console.log(`==================================================`);
console.log(`  GitHub Contribution Greening Generator`);
console.log(`==================================================`);
console.log(`Start Date  : ${startDateStr}`);
console.log(`End Date    : ${endDateStr}`);
console.log(`Min Commits : ${minCommits} / day`);
console.log(`Max Commits : ${maxCommits} / day`);
console.log(`Author Email: ${gitEmail}`);
console.log(`Auto Push   : ${shouldPush ? 'Yes' : 'No'}`);
console.log(`==================================================\n`);

let totalCommits = 0;
let totalDays = 0;

let currentDate = new Date(startDate);
while (currentDate <= endDate) {
  totalDays++;
  const commitsForToday = Math.floor(Math.random() * (maxCommits - minCommits + 1)) + minCommits;

  for (let i = 0; i < commitsForToday; i++) {
    const hour = Math.floor(Math.random() * 14) + 8;
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);

    const commitDate = new Date(currentDate);
    commitDate.setHours(hour, minute, second);
    const formattedDate = commitDate.toISOString();

    // Use empty commits - no file tracking needed
    const gitCommand = `git commit --allow-empty -m "chore: contribution ${formattedDate}"`;
    const env = {
      ...process.env,
      GIT_AUTHOR_DATE: formattedDate,
      GIT_COMMITTER_DATE: formattedDate,
      GIT_AUTHOR_EMAIL: gitEmail,
      GIT_COMMITTER_EMAIL: gitEmail,
    };

    execSync(gitCommand, { cwd: __dirname, env, stdio: 'ignore' });
    totalCommits++;
  }

  const dateStr = currentDate.toISOString().split('T')[0];
  if (totalDays % 30 === 0 || currentDate >= endDate) {
    console.log(`[Progress] Processed up to ${dateStr} | Total Commits: ${totalCommits}`);
  }

  currentDate.setDate(currentDate.getDate() + 1);
}

console.log(`\nCompleted! Generated ${totalCommits} commits across ${totalDays} days.`);

if (shouldPush) {
  console.log(`\nPushing to GitHub (origin main)...`);
  try {
    execSync('git push --force origin main', { cwd: __dirname, stdio: 'inherit' });
    console.log(`Successfully pushed!`);
  } catch (error) {
    console.error(`Push failed. Run: git push --force origin main`);
  }
} else {
  console.log(`\nRun: git push --force origin main`);
}
