// div containing profile information
const overviewDivElement = document.querySelector(".overview");
// github username;
const username = "tkant763";
// unordered list for displaying repos
const repoList = document.querySelector(".repo-list");
// section where all repo information appears
const allReposElement = document.querySelector(".repos");
// seciotn where individual repo data appears
const repoDataElement = document.querySelector(".repo-data");

// fetch Github user data
const getAPIData = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    // console.log(data);
    
    displayUserProfile(data);
};

getAPIData();

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
  overviewDivElement.append(userProfileDiv);

  fetchRepos();
};

const fetchRepos = async function () {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const data = await response.json();
  // console.log(data);

  displayRepoList(data);
};

// display the repos belonging to the account in an HTML unordered list 
const displayRepoList = function (repos) {
  for (let item of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${item.name}</h3>`;
    repoList.append(li);
  }
};

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

  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  // console.log(languageData);

  const languages = [];
  for(let key in languageData) {
    languages.push(key);
  }

  console.log(languages);

  displayRepoInfo(repoInfo, languages)
}

// display the information for a specific repo
const displayRepoInfo = function(repoInfo, languages) {
  repoDataElement.innerHTML = "";

  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoDataElement.append(div);
  repoDataElement.classList.remove("hide");
  repoList.classList.add("hide");

};