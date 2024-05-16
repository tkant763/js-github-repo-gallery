// div containing profile information
const overviewDivElement = document.querySelector(".overview");
// github username;
const username = "tkant763";

// fetch JSON data
const getAPIData = async function() {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
};

getAPIData();