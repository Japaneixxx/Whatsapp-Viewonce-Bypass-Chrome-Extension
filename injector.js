const interval = setInterval(() => {
  if (!document.querySelector("#side")) return;
  clearInterval(interval);

  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("script.js");

  (document.head || document.documentElement).appendChild(script);
}, 100);
