const axios = require('axios');
require('dotenv').config();
const readlineSync = require('readline-sync');

// Set up the GitHub token and username
const githubToken = process.env.GITHUB_TOKEN;
const username = 'ifzyy'; // Replace with your GitHub username

// Configure axios for GitHub API authentication
axios.defaults.headers.common['Authorization'] = `token ${githubToken}`;

// Function to delete a repository
async function deleteRepo(repoName) {
    try {
        const response = await axios.delete(`https://api.github.com/repos/${username}/${repoName}`);
        if (response.status === 204) {
            console.log(`Repository '${repoName}' successfully deleted.`);
        }
    } catch (error) {
        console.error(`Error deleting repository '${repoName}': ${error.response.status}`);
    }
}

// Main function to get user input and process deletion requests
function main() {
    console.log("Enter the names of the repositories you want to delete, separated by commas (e.g., repo1,repo2):");
    const repos = readlineSync.question().split(',');

    repos.forEach(repo => {
        const confirm = readlineSync.question(`Are you sure you want to delete ${repo.trim()}? (y/n): `);
        if (confirm.toLowerCase() === 'y') {
            deleteRepo(repo.trim());
        } else {
            console.log(`Skipping ${repo.trim()}`);
        }
    });
}

main();
