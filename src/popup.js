// Written by 2021 Gunhee Yi (gunny@kaist.ac.kr).

function showText(){
    const isMac = navigator.platform=="MacIntel";
    const altSymbol = isMac ? "⌥" : "Alt";
    const enterSymbol = isMac ? "↩" : "↵";
    var texts = [
        // {
        //     id: "vodControl",
        //     kor: "VOD 제어",
        //     eng: "VOD Control"
        // },
        {
            id: "jumpLabel",
            kor: " ←/→를 눌러 점프:",
            eng: " Override ←/→ to jump"
        },
        {
            id: "longJumpLabel",
            kor: ` (${altSymbol} + ←/→)를 눌러 긴 점프:`,
            eng: ` Press (${altSymbol}  + ←/→) to jump`
        },
        {
            id: "jumpSecondsLabel",
            kor: "초",
            eng: "seconds"
        },,
        {
            id: "longJumpSecondsLabel",
            kor: "초",
            eng: "seconds"
        },
        {
            id: "speedControlLabel",
            kor: ' Z/X/C를 눌러 재생속도 조절<sup data-toggle="tooltip" title="1. (Shift + ←/→)를 눌러 조절하는 기능이 이미 있습니다.">!</sup>:',
            eng: ' Press Z/X/C to control speed<sup data-toggle="tooltip" title="You can control playback speed through (Shift + ←/→) by default.">!</sup> by'
        },
        {
            id: "vodControlTitle",
            kor: '동영상 제어 <span style="text-decoration:none; font-size: 12px;">⚠️ 제작자는 동영상 임의 조작에 따른 결과에 책임을 지지 않습니다.</span>',
            eng: 'VOD Control <span style="text-decoration:none; font-size: 12px;">⚠️ The user assumes all responsibility for controlling VODs.</span>'
        },
        {
            id: "miscellaneousTitle",
            kor: '기타',
            eng: 'Miscellaneous'
        },
        {
            id: "weekAllLabel",
            kor: " 강의실 입장 시 전체 주차 표시",
            eng: ' Week to ALL when entering lecture rooms'
        },
        {
            id: "enterToWeekLabel",
            kor: ` ${enterSymbol}를 눌러 현재 주차로 이동`,
            eng:  ` Press ${enterSymbol} to scroll to current week`
        },
        {
            id: "darkAtNightLabel",
            kor: " 밤에는 다크 테마 사용",
            eng: " Use dark theme at night"
        },
        {
            id: "redirectToLoginLabel",
            kor: " 로그인 페이지로 자동 리다이렉트",
            eng: " Automatic redirect to login"
        },
        {
            id: "references",
            kor: ' <a id="resourcesSwitch" href="#" style="text-decoration: none;">외부리소스 출처</a>',
            eng: ' <a id="resourcesSwitch" href="#" style="text-decoration: none;">External resource referenes</a>'
        },
        {
            id: "writtenBy",
            kor: ' 2021 <a id="linksSwitch" href="#" style="text-decoration: none;">이건희</a>',
            eng: ' 2021 <a id="linksSwitch" href="#" style="text-decoration: none;">Gunhee Yi</a>'
        }
    ]
    texts.forEach(text => document.getElementById(text.id).innerHTML = text[settings.language]);
}

function activateSwitches() {
    $( function() {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $("#linksSwitch").on("click", function() {
        if($("#links").css("display") == "none"){
            $("#links").show();
        } else {
            $("#links").hide();
        }
    });

    document.getElementById("title").addEventListener('click', () => chrome.tabs.create({active: true, url: "https://github.com/GunheeYi/nupjuk"}));
    document.getElementById("email").addEventListener('click', () => chrome.tabs.create({active: true, url: "mailto:gunny@kaist.ac.kr"}));
    document.getElementById("github").addEventListener('click', () => chrome.tabs.create({active: true, url: "https://github.com/GunheeYi"}));
    document.getElementById("instagram").addEventListener('click', () => chrome.tabs.create({active: true, url: "https://instagram.com/gunhee_yi"}));
    document.getElementById("resourcesSwitch").addEventListener('click', () => chrome.tabs.create({active: true, url: chrome.runtime.getURL("memo.html")}));
}

window.onload = function() {
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
        if(themeRadio) settings.themeName = themeRadio.value;
        return true;
    }

    function applySettings(){
        if(verifySettings()){
            activateSwitches();
            chrome.storage.sync.set(settings, function(){
                if(settings.themeName=="original"){
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
                    });
                } else {
                    chrome.tabs.executeScript({file: 'before.js'}, function(){
                        chrome.tabs.executeScript({file: 'after.js'});
                    })
                }
            });
        }
    }
    
    chrome.storage.sync.get(Object.keys(settings), function(syncedSettings) {
        Object.keys(settings).forEach(key => {
            settings[key] = syncedSettings.hasOwnProperty(key) ? syncedSettings[key] : (localStorage.hasOwnProperty(key) ? localStorage[key] : settings[key]);
        });
        settingsKeysTextAndCheckboxOnly.forEach(key => {
            
            el = document.getElementById(key);
            switch (el.type) {
                case "text":
                    el.value = settings[key]
                    el.onfocus = event => event.target.classList.remove("invalid");
                    break;
                case "checkbox":
                    el.checked = settings[key]
                    trigger(el);
                    el.addEventListener("change", function(event) { trigger(event.target); });
                    break;
            }
        });

        showText();
        settings.themes.forEach(theme => {
            document.getElementById("themeSelection").innerHTML += `
                <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="radio" class="btn-check" id="radio${theme.titleEng}" name="themeRadios" value="${theme.name}">
                    <label class="btn btn-outline-primary themeLabel" for="radio${theme.titleEng}" title="${settings.language=="kor" ? theme.titleKor : theme.titleEng}" style="width:25px; height:25px; background-color: ${theme.light}; border-color: ${theme.light};"></label>
                </div>
            `
        });

        for(let radio of document.getElementsByName("themeRadios")) radio.onclick=applySettings;
        settingsKeysTextAndCheckboxOnly.forEach(key => document.getElementById(key).addEventListener("change", applySettings));
        //for (let label of document.getElementsByClassName("themeLabel")) label.onclick=applySettings;
        // for (let c of document.getElementById("themeSelection").children) {
        //     c.onclick = applyToPage;
        // }
    
        activateSwitches();

        ["kor", "eng"].forEach(lang => {
            document.getElementById(lang).onclick = () => {
                settings.language = lang;
                showText();
                applySettings();
            }
        });
        
    });

    
}