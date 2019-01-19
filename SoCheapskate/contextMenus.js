// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.contextMenus.create({
    id: "context",
    title: "Search Using SoCheapskate",
    contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if(info.selectionText !== undefined && info.selectedText != ""){
        let url = "popup.html?selection="+ info.selectionText;
        chrome.tabs.create({url:url, index: tab.index +1});
    }
});