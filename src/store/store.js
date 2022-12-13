import { defineStore } from "pinia";
import { reactive } from "vue";

export const useStore = defineStore("member", () => {
  const keywordData = [
    {
      id: 1,
      title: "ES6のアロー関数",
      keyword: "function",
      command: "1 + 2"
    },
    {
      id: 2,
      title: "配列の最後を取り除く",
      keyword: "pop",
      command: "Date()"
    },
    {
      id: 3,
      title: "ES6のアロー関数",
      keyword: "function",
      command: "const myName = 'It is me3!' "
    },
    {
      id: 4,
      title: "ES6のアロー関数",
      keyword: "function",
      command: "const myName = 'It's me4!'"
    },
    {
      id: 5,
      title: "配列の最後を取り除く",
      keyword: "pop",
      command: "const myName = 'It's me5!'"
    },
    {
      id: 6,
      title: "ES6のアロー関数",
      keyword: "function",
      command: "const myName = 'It's me6!'"
    },
  ];

  const articleData = [
    {
      id: 1,
      title: "配列の最後を取り除く",
      url: "https://asameshicode.com",
    },
    {
      id: 2,
      title: "知っておくべきショートカット",
      url: "https://asameshicode.com",
    },
  ];

  let historyData = [];


  // Command on console

  const sendCommand = (text) => {
    let argsIndex = text.indexOf(" ");
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;
    return command
  }


  return {
    keywordData,
    articleData,
    historyData,
    sendCommand,
  };
});
