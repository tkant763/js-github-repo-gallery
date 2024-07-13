// div containing profile information
const overview = document.querySelector(".overview");
// github username;
const username = "tkant763";
// unordered list for displaying repos
const repoList = document.querySelector(".repo-list");
// section where all repo information appears
const allReposElement = document.querySelector(".repos");
// section where individual repo data appears
const repoData = document.querySelector(".repo-data");
// "back to repo gallery" button
const viewReposButton = document.querySelector(".view-repos");
// "search by name" text input
const filterInput = document.querySelector(".filter-repos");

// fetch Github user data
const gitUserInfo = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    
    // console.log(data);
    displayUserProfile(data);
};

gitUserInfo();

// display Github user data
const displayUserProfile = function (data) {
    const userProfileDiv = document.createElement("div");
    userProfileDiv.classList.add("user-info");
    userProfileDiv.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(userProfileDiv);

  fetchRepos();
};

// get the repos belonging to the account via API
const fetchRepos = async function () {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const data = await response.json();

  // console.log(data);
  displayRepoList(data);
};

// display the repos belonging to the account in an HTML unordered list 
const displayRepoList = function (repos) {
  filterInput.classList.remove("hide");
  
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

// make all the listed repos clickable
repoList.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

// fetches information about a specific repository
const getRepoInfo = async function(repoName) {
  const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await response.json();
  console.log(repoInfo);

  // get languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  // list languages
  const languages = [];
  for(const language in languageData) {
    languages.push(language);
  }

  displayRepoInfo(repoInfo, languages);
}

// display the information for a specific repo
const displayRepoInfo = function(repoInfo, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  viewReposButton.classList.remove("hide");
  repoList.classList.add("hide");

  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(div);
};

// return to repo gallery display by clicking a button
viewReposButton.addEventListener("click", function() {
  repoList.classList.remove("hide");
  repoData.classList.add("hide");
  viewReposButton.classList.add("hide");
});

// search 
filterInput.addEventListener("input", function(e) {
  const inputText = e.target.value;
  const searchQuery = inputText.toLowerCase();
  
  const repos = document.querySelectorAll(".repo");
  // console.log(repos);
  
  for (const repo of repos) {
    const repoName = repo.innerText.toLowerCase();
    console.log(repoName);

    if (!(repoName.match(searchQuery))) {
      repo.classList.add("hide");
    } else {
      repo.classList.remove("hide");
    }
  }
  
});