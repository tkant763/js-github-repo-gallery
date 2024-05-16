// div containing profile information
const overviewDivElement = document.querySelector(".overview");
// github username;
const username = "tkant763";

// fetch Github user data
const getAPIData = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    
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
};
