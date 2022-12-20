import axios from "axios";

const getClient = axios.create({
  baseURL: "http://asameshi-api.cloud/api/",
  withCredentials: false,
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


// 
export const getCommand = () => {
  return getClient().get("command/");
};

async function getMostFollowedUsers() {
  const noOfFollowers = 35000;
  const perPage = 10;
  //ref: https://docs.GitHub.com/en/GitHub/searching-for-information-on-GitHub/searching-on-GitHub/searching-users
  const response = await GitHubClient.get(`search/users?q=followers:>${noOfFollowers}&per_page=${perPage}`, {timeout: 1500});
  return response.data.items;
}

export const getArticle = () => {
  return getClient().get("article/");
};
