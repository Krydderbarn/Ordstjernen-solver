chrome.action.onClicked.addListener((tab) => {
  if (tab.url !== "https://www.vg.no/spill/ordstjernen") {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: () => alert("This extension only works on https://www.vg.no/spill/ordstjernen")
    });
    return;
  }

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: () => {
      if (document.querySelector('[class^="App_wordCount__"] > :nth-child(1)').textContent == document.querySelector('[class^="App_wordCount__"] > :nth-child(2)').textContent) {
        alert("You have already solved the puzzle!");
        return;
      }

      if (document.querySelector('div[class^="App_wordCount__"]')) {
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: ['solver.js']
        });
      }
    }
  });
});