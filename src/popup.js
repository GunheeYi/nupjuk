// Written by 2021 Gunhee Yi (gunny@kaist.ac.kr).

function showText(){
    const isMac = navigator.platform=="MacIntel";
    const altSymbol = isMac ? "⌥" : "Alt";
    const enterSymbol = isMac ? "↵" : "↵";
    var texts = [
        {
            id: "vodControlTitle",
            kor: '동영상',
            eng: 'VOD'
        },
        {
            id: "vodControlWarning",
            kor: "⚠️ 동영상 임의 조작에 따른 결과의 모든 책임은 사용자에게 있습니다.",
            eng: "⚠️ The user assumes all responsibility for controlling VODs."
        },
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
        },
        {
            id: "longJumpSecondsLabel",
            kor: "초",
            eng: "seconds"
        },
        {
            id: "speedControlLabel",
            kor: ' Z/X/C를 눌러 재생속도 조절<sup>1</sup>:',
            eng: ' Press Z/X/C to control speed<sup>1</sup> by'
        },
        {
            id: "mainTitle",
            kor: 'KLMS 메인',
            eng: 'KLMS Main'
        },
        {
            id: "lectureRoomTitle",
            kor: '강의실',
            eng: 'Lecture Room'
        },
        {
            id: "miscellaneousTitle",
            kor: '기타',
            eng: 'Miscellaneous'
        },
        {
            id: "weekAllLabel",
            kor: " 강의실 입장 시 전체 주차 표시",
            eng: ' Show week as ALL by default'
        },
        {
            id: "enterToWeekLabel",
            kor: ` ${enterSymbol}를 눌러 현재 주차로 이동<sup>2</sup>`,
            eng:  ` Press ${enterSymbol} to scroll to current week<sup>2</sup>`
        },
        {
            id: "studentListLabel",
            kor: " 수강생 수를 눌러 목록 확인",
            eng: ' Click number of students to see the list'
        },
        {
            id: "weekSliderLabel",
            kor: " 주차 슬라이더 드래그 방식으로 변경",
            eng: ' Modify week slider to draggable mode'
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
            id: "cleanNotificationLabel",
            kor: " 알림 0개일 때 빨간색 원 숨기기",
            eng: " Hide red circle when 0 notifications"
        },
        // {
        //     id: "downloadLabel",
        //     kor: ' 다운로드 버튼 표시<sup data-toggle="tooltip" title="개발하는 현재(2021.03.19) 강의자료의 허용되지 않은 다운로드가 불가합니다.">!</sup>',
        //     eng: ' Show download buttons<sup data-toggle="tooltip" title="Unallowed download of lecture materials is blocked at the moment of development(2021.03.19).">!</sup>'
        // },
        {
            id: "colorTitle",
            kor: " 색상 테마",
            eng: " Color scheme"
        },
        {
            id: "overrideLightLabel",
            kor: " 커스텀 라이트 테마 활성화",
            eng: " Enable custom light theme"
        },
        {
            id: "overrideDarkLabel",
            kor: " 커스텀 다크 테마 활성화",
            eng: " Enable custom dark theme"
        },
        {
            id: "cleanNotificationLabel",
            kor: " 알림 0개일 때 빨간색 원 숨기기",
            eng: " Hide red circle when 0 notifications"
        },
        {
            id: "readNotificationLabel",
            kor: " 알람 확인 시 지우기",
            eng: " Erase notifications when read"
        },
        {
            id: "compactViewLabel",
            kor: " 과목 패널 조밀하게",
            eng: " Compact course panel"
        },
        {
            id: "panelButtonLabel",
            kor: " 과목 패널 전체를 강의실 링크로",
            eng: " Link whole course panel to lecture room"
        },
        {
            id: "caisTitle",
            kor: "학사시스템",
            eng: "Academic System"
        },
        {
            id: "courseHeightLabel",
            kor: "수강신청 과목 목록 높이 조절",
            eng: "Adjust course list height"
        },
        {
            id: "courseHeightOriginalLabel",
            kor: "기본값",
            eng: "Default"
        },
        {
            id: "courseHeightFullLabel",
            kor: "확장",
            eng: "Expand"
        },
        {
            id: "courseHeightCustomLabel",
            kor: "설정값",
            eng: "Custom"
        },
        {
            id: "shiftComment",
            kor: "(Shift + ←/→)를 눌러 조절하는 기능이 이미 있습니다.",
            eng: "You can control playback speed through (Shift + ←/→) by default."
        },
        {
            id: "weeksComment",
            kor: '주차 이동 기능이 작동하지 않는다면 <a id="weeks" href="">여기</a>를 참고하세요.',
            eng: 'If it does not work properly, please consult <a id="weeks" href="">here</a>.'
        },
        {
            id: "docs",
            kor: 'Docs',
            eng: 'Docs'
        },
        {
            id: "srcs",
            kor: '외부리소스 출처',
            eng: 'References'
        },
        {
            id: "releases",
            kor: '업데이트 이력',
            eng: 'Release Notes'
        },
        {
            id: "gunhee",
            kor: '이건희',
            eng: 'Gunhee Yi'
        }
    ]
    texts.forEach(text => {
        const el = document.getElementById(text.id);
        if (el) el.innerHTML = text[settings.language];
    });
}

function activateSwitches() {
    document.getElementById("title").addEventListener('click', () => chrome.tabs.create({active: true, url: "https://github.com/GunheeYi/nupjuk"}));
    document.getElementById("gunhee").addEventListener('click', () => chrome.tabs.create({active: true, url: "https://gunh.ee/"}));
    document.getElementById("docs").addEventListener('click', () => chrome.tabs.create({active: true, url: "https://gunh.ee/p/40"}));
    document.getElementById("weeks").addEventListener('click', () => chrome.tabs.create({active: true, url: "https://gunh.ee/p/40#weekCalculation"}));
    document.getElementById("releases").addEventListener('click', () => chrome.tabs.create({active: true, url: "https://gunh.ee/p/40#releaseNotes"}));
    document.getElementById("srcs").addEventListener('click', () => chrome.tabs.create({active: true, url: "https://gunh.ee/p/40#externalResourceReferences"}));
}

function trigger(checkbox) {
    var toTrigger = dependencies[checkbox.id];
    if (checkbox.checked) toTrigger.forEach(id => document.getElementById(id).disabled = false);
    else toTrigger.forEach(id => document.getElementById(id).disabled = true);
}

function saveSettings(){
    inputs.forEach(setting => {
        if (setting.includes("Radios")) {
            const val = document.querySelector(`input[name="${setting}"]:checked`).value;
            settings[setting] = val;
            localStorage[setting] = val;
        } else {
            el = document.getElementById(setting);
            switch (el.type) {
                case "text":
                    var val;
                    if (/^0\.?0*$/.test(el.value)) val = 0;
                    else val = Number(el.value);
                    if(val==0 || val) {
                        settings[setting] = val;
                        localStorage[setting] = val;
                    } else {
                        el.classList.add("invalid");
                        return false;
                    }
                    break;
                case "checkbox":
                    settings[setting] = el.checked;
                    localStorage[setting] = el.checked;
                    break;
                case "color":
                    settings[setting] = el.value;
                    localStorage[setting] = el.value;
            }
        }
        
    });

    var themeRadio = document.querySelector('input[name="themeRadios"]:checked');
    if(themeRadio) settings.themeRadios = themeRadio.value;
    return true;
}

function setLabelColors() {
    document.getElementById("background").style.background = `
        repeating-linear-gradient(
            -45deg, 
            ${settings.darkLight},
            ${settings.darkLight} 10px,
            ${settings.darkLighter} 10px,
            ${settings.darkLighter} 20px
        )
    `;
    document.getElementById("darkFontLightLabel").style.color = settings.darkFontLight;
    document.getElementById("darkFontDarkLabel").style.color = settings.darkFontDark;
}

function syncSettings(){
    
    if(saveSettings()){
        activateSwitches();
        chrome.storage.sync.set(settings, function(){
            if(settings.themeRadios=="original"){
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
                });
            } else {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.scripting.executeScript({
                        target: {tabId: tabs[0].id, allFrames: true},
                        files: ['before.js', 'after.js'],
                    });
                });
                
            }
        });
        setLabelColors();
    }
}

window.onload = function() {
    // Use this when editing popup.
    // showText();
    // return;

    // Load pre-saved settings; if none set default values
    chrome.storage.sync.get(Object.keys(settings), function(syncedSettings) {
        Object.keys(settings).forEach(key => {
            settings[key] = syncedSettings.hasOwnProperty(key) ? syncedSettings[key] : (localStorage.hasOwnProperty(key) ? localStorage[key] : settings[key]);
        });
        
        setLabelColors();

        themes.forEach(theme => {
            document.getElementById("themeSelection").innerHTML += `
                <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="radio" class="btn-check" id="radio${theme.titleEng}" name="themeRadios" value="${theme.name}" id="${theme.name}">
                    <label class="btn btn-outline-primary themeLabel" for="radio${theme.titleEng}" title="${settings.language=="kor" ? theme.titleKor : theme.titleEng}" style="width:25px; height:25px; background-color: ${theme.light}; border-color: ${theme.light};"></label>
                </div>
            `
        });

        inputs.forEach(key => {
            if (key.includes("Radios")) {
                document.querySelector(`input[name="${key}"][value="${settings[key]}"]`).checked = true;
                switch (key) {
                    case "courseHeightRadios":
                        const courseHeightCustom = document.getElementById("courseHeightCustom");
                        trigger(courseHeightCustom);
                        ["courseHeightOriginal", "courseHeightFull", "courseHeightCustom"].forEach(id => document.getElementById(id).addEventListener('change', () => trigger(courseHeightCustom)));
                        // courseHeightCustom.addEventListener('change', function(event) { trigger(event.target); });
                        break;
                }
            } else {
                el = document.getElementById(key);
                switch (el.type) {
                    case "text":
                        el.value = settings[key]
                        el.onfocus = event => event.target.classList.remove("invalid");
                        break;
                    case "checkbox":
                        el.checked = settings[key]
                        trigger(el); // able disable
                        el.addEventListener("change", function(event) { trigger(event.target); }); // able disable
                        break;
                    case "color":
                        el.value = settings[key]
                }
            }
        });

        showText();
        
        inputs.forEach(key => {
            if (key.includes("Radio")) document.querySelectorAll(`input[name="${key}"]`).forEach(el => el.addEventListener("change", syncSettings));
            else document.getElementById(key).addEventListener("change", syncSettings)
        });
    
        activateSwitches();

        ["kor", "eng"].forEach(lang => {
            document.getElementById(lang).onclick = () => {
                settings.language = lang;
                showText();
                syncSettings();
            }
        });
        
    });

    
}