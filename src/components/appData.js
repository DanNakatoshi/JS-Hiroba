const appData = {
  // Btn
  howToBtn: {
    jp: "使い方",
    en: "How to",
  },
  keywordBtn: {
    jp: "検索",
    en: "Search",
    icon: "pi pi-search",
  },
  articleBtn:{
    jp: "記事",
    en: "Articles",
    icon: "pi pi-book",
  },
  historyBtn:{
    jp: "履歴",
    en: "History",
    icon: "pi pi-database",
  },
  btnClass:"flex-grow-1 sm:flex-grow-0 cursor-pointer ",
  btnWrapper:"flex justify-content-center flex-wrap gap-2 md:gap-3 my-3",
  // Console
  howToMsgJP: `
  //コードを実行したあとにconsole.log()の結果が表示されます。
  console.log('My first code');
  console.log(13 + 4);

  let app = "JS hiroba";
  console.log("ようこそ、" + app + "へ!");

  //↓実行ボタンを押してください。
  `,
  howToMsgEN: `
  //You can see the console.log() response after executing the code
  console.log('My first code');
  console.log(13 + 4);

  let app = "JS hiroba";
  console.log("Welcome to " + app + "!!");

  //↓Click RUN button to execute
  `
};

export default appData