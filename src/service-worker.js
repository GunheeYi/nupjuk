// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({active: true, url: "https://gunh.ee/p/40?justInstalled=true"});
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        // console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
        chrome.tabs.create({active: true, url: `https://gunh.ee/p/40?updatedTo=${thisVersion}`});
    }
});