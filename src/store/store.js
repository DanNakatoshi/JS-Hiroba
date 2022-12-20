import { defineStore } from "pinia";
import { ref } from "vue";
// import { getCommand, getArticle } from "@/plugins/EventService";
import axios from "axios";

export const useStore = defineStore("member", () => {
  const keywordData = ref(null);

  const getCommandData = async () => {
    try {
      const response = await axios.get(
        `http://asameshi-api.cloud/api/command/`
      );
      keywordData.value = response.data
      
    } catch (error) {
      // console.log(error);
    }
  };
  getCommandData();

  const articleData = [];

  // const getArticleData = () => {
  //   getArticle()
  //     .then((response) => {
  //       articleData = response.data;
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("data:" + error);
  //     });
  //   loading.value = true;
  // };
  // getArticleData();

  let historyData = [];

  // Command on console

  const sendCommand = (text) => {
    let argsIndex = text.indexOf(" ");
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;
    return command;
  };

  return {
    keywordData,
    articleData,
    historyData,
    sendCommand,
  };
});
