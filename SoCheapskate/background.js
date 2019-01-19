  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });

  
  
chrome.contextMenus.create({
  id: "compare",
  title: "Search Using SoCheapskate",
  contexts: ["page","selection","link","editable","image","video","audio"],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "compare" && info.selectionText !== undefined) {
      let url = "popup.html?selection="+ info.selectionText;
      chrome.tabs.create({url:url, index: tab.index +1});
    }
});
