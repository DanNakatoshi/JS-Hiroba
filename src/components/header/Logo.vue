<template>
  <div id="logo" class="w-7rem h-3rem shadow-pop-bl flex justify-content-center border-round-sm">
    <div class="flex align-items-end mb-1">
      <span id="logo--text" class="text-4xl">JS</span>
      <span id="logo--text" class="text-xl ">ひろば</span>
    </div>
  </div>
  
</template>

<style>
/* Theme color */
:root {
  --bg-purple: #6a2c70;
  --bg-yellow: #f9ed69;
  --font-dark: #191919;
}

#logo {
  background-color: var(--bg-yellow);
  height: 57px;
}

#logo--text {
  font-size: 48px;
  font-weight: bold;
  color:#121212;
}

/* Animation */

.shadow-pop-bl {
  -webkit-animation: shadow-pop-bl 0.3s cubic-bezier(0.47, 0, 0.745, 0.715) 1s
    both;
  animation: shadow-pop-bl 0.3s cubic-bezier(0.47, 0, 0.745, 0.715) 1s both;
}
@-webkit-keyframes shadow-pop-bl {
  0% {
    -webkit-box-shadow: 0 0 var(--bg-purple), 0 0 var(--bg-purple),
      0 0 var(--bg-purple), 0 0 var(--bg-purple), 0 0 var(--bg-purple),
      0 0 var(--bg-purple), 0 0 var(--bg-purple), 0 0 var(--bg-purple);
    box-shadow: 0 0 var(--bg-purple), 0 0 var(--bg-purple), 0 0 var(--bg-purple),
      0 0 var(--bg-purple), 0 0 var(--bg-purple), 0 0 var(--bg-purple),
      0 0 var(--bg-purple), 0 0 var(--bg-purple);
    -webkit-transform: translateX(0) translateY(0);
    transform: translateX(0) translateY(0);
  }
  100% {
    -webkit-box-shadow: -1px 1px var(--bg-purple), -2px 2px var(--bg-purple),
      -3px 3px var(--bg-purple), -4px 4px var(--bg-purple),
      -5px 5px var(--bg-purple), -6px 6px var(--bg-purple),
      -7px 7px var(--bg-purple), -8px 8px var(--bg-purple);
    box-shadow: -1px 1px var(--bg-purple), -2px 2px var(--bg-purple),
      -3px 3px var(--bg-purple), -4px 4px var(--bg-purple),
      -5px 5px var(--bg-purple), -6px 6px var(--bg-purple),
      -7px 7px var(--bg-purple), -8px 8px var(--bg-purple);
    -webkit-transform: translateX(8px) translateY(-8px);
    transform: translateX(8px) translateY(-8px);
  }
}
@keyframes shadow-pop-bl {
  0% {
    -webkit-box-shadow: 0 0 var(--bg-purple), 0 0 var(--bg-purple),
      0 0 var(--bg-purple), 0 0 var(--bg-purple), 0 0 var(--bg-purple),
      0 0 var(--bg-purple), 0 0 var(--bg-purple), 0 0 var(--bg-purple);
    box-shadow: 0 0 var(--bg-purple), 0 0 var(--bg-purple), 0 0 var(--bg-purple),
      0 0 var(--bg-purple), 0 0 var(--bg-purple), 0 0 var(--bg-purple),
      0 0 var(--bg-purple), 0 0 var(--bg-purple);
    -webkit-transform: translateX(0) translateY(0);
    transform: translateX(0) translateY(0);
  }
  100% {
    -webkit-box-shadow: -1px 1px var(--bg-purple), -2px 2px var(--bg-purple),
      -3px 3px var(--bg-purple), -4px 4px var(--bg-purple),
      -5px 5px var(--bg-purple), -6px 6px var(--bg-purple),
      -7px 7px var(--bg-purple), -8px 8px var(--bg-purple);
    box-shadow: -1px 1px var(--bg-purple), -2px 2px var(--bg-purple),
      -3px 3px var(--bg-purple), -4px 4px var(--bg-purple),
      -5px 5px var(--bg-purple), -6px 6px var(--bg-purple),
      -7px 7px var(--bg-purple), -8px 8px var(--bg-purple);
    -webkit-transform: translateX(8px) translateY(-8px);
    transform: translateX(8px) translateY(-8px);
  }
}

/* END Animation */
</style>
