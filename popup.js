// Written by 2021 Gunhee Yi (gunny@kaist.ac.kr).

window.onload = function() {

    // Check if running on Mac
    if (navigator.platform=="MacIntel") {
        document.getElementById("longJumpLabel").innerHTML = "Press (⌥ + ←/→) to jump";
    }
    // Draw Nupjuk
    //document.getElementById("nupjuk").src = chrome.runtime.getURL("img/nupjuk128.png");

    // Load pre-saved settings; if none set default values
    

    function trigger(checkbox) {
        var toTrigger = dependencies[checkbox.id];
        if (checkbox.checked) toTrigger.forEach(id => document.getElementById(id).disabled = false);
        else toTrigger.forEach(id => document.getElementById(id).disabled = true);
    }

    function verifySettings(){
        settingsKeysTextAndCheckboxOnly.forEach(setting => {
            el = document.getElementById(setting);
            switch (el.type) {
                case "text":
                    seconds = Number(el.value);
                    if(seconds) {
                        settings[setting] = seconds;
                        localStorage[setting] = seconds;
                    }
                    else {
                        el.classList.add("invalid");
                        return false;
                    }
                    break;
                case "checkbox":
                    settings[setting] = el.checked;
                    localStorage[setting] = el.checked;
                    break;
            }
        });

        var themeRadio = document.querySelector('input[name="themeRadios"]:checked');
        if(themeRadio) settings.theme = themeRadio.value;
        return true;
    }

    function applySettings(){
        if(verifySettings()){
            chrome.storage.sync.set(settings, function(){
                chrome.tabs.executeScript({
                    file: 'contentscript.js'
                });
            });
        }
    }
    
    chrome.storage.sync.get(settingsKeys, function(syncedSettings) {
        settingsKeysTextAndCheckboxOnly.forEach(key => {
            settings[key] = syncedSettings.hasOwnProperty(key) ? syncedSettings[key] : (localStorage.hasOwnProperty(key) ? localStorage[key] : settings[key]);
            el = document.getElementById(key);
            switch (el.type) {
                case "text":
                    el.value = settings[key]
                    el.onfocus = event => event.target.classList.remove("invalid");
                    break;
                case "checkbox":
                    el.checked = settings[key]
                    trigger(el);
                    el.onchange = event => trigger(event.target);
                    break;
            }
        });

        Object.keys(settings.themes).forEach(theme => {
            document.getElementById("themeSelection").innerHTML += `
                <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="radio" class="btn-check" id="radio${settings.themes[theme].title}" name="themeRadios" value="${theme}">
                    <label class="btn btn-outline-primary themeLabel" for="radio${settings.themes[theme].title}" title="${settings.themes[theme].title}" style="width:25px; height:25px; background-color: ${settings.themes[theme].light}; border-color: ${settings.themes[theme].light};"></label>
                </div>
            `
        });

        for(let radio of document.getElementsByName("themeRadios")) radio.onclick=applySettings;
        settingsKeysTextAndCheckboxOnly.forEach(key => document.getElementById(key).onchange=applySettings);
        //for (let label of document.getElementsByClassName("themeLabel")) label.onclick=applySettings;
        // for (let c of document.getElementById("themeSelection").children) {
        //     c.onclick = applyToPage;
        // }
    });

    // Save new settings

    

    document.getElementById("save").onclick = function() {
        if(applySettings()){
            chrome.storage.sync.set(settings, function(){
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.reload(tabs[0].id);
                });
            });
        }
    }
}