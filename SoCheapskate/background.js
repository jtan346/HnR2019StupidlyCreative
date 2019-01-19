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

  
  
  // A generic onclick callback function.
function genericOnClick(info, tab) {
  let url = "popup.html?selection="+ info.selectionText;
  chrome.tabs.create({url:url, index: tab.index +1});
}

chrome.contextMenus.create({"title": "Search Using SoCheapskate", ["page","selection","link","editable","image","video",
                "audio"],"onclick": genericOnClick});