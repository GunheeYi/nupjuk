// Written by 2021 Gunhee Yi (gunny@kaist.ac.kr).

var imgReplaces = [
    {
        old: ["turnitin"],
        new: chrome.runtime.getURL("img/turnitin.svg"),
    },
    {
        old: ["zoom"],
        new: chrome.runtime.getURL("img/zoom.svg"),
    },
    {
        old: ["peerreview"],
        new: chrome.runtime.getURL("img/peer_review.svg"),
    },
    {
        old: ["assign"],
        new: chrome.runtime.getURL("img/assignment.svg"),
    },
    {
        old: ["quiz"],
        new: chrome.runtime.getURL("img/quiz.svg"),
    },
    {
        old: ["url"],
        new: chrome.runtime.getURL("img/link.svg"),
    },
    {
        old: ["resource", "f%2Funknown-24"],
        new: chrome.runtime.getURL("img/file.svg"),

    },
    {
        old: ["disk"],
        new: chrome.runtime.getURL("img/disk.svg"),
    },
    {
        old: ["secret"],
        new: chrome.runtime.getURL("img/lock.svg"),
    },
    {
        old: ["reply"],
        new: chrome.runtime.getURL("img/answer.svg"),
    },
    {
        old: ["notice"],
        new: chrome.runtime.getURL("img/announcement.svg"),
    },
    // {
    //     old: ["notice"],
    //     new: chrome.runtime.getURL("img/star.svg"),
    // },
    {
        old: ["new"],
        new: chrome.runtime.getURL("img/new.svg"),
    },
    {
        old: ["up"],
        new: chrome.runtime.getURL("img/updated.svg"),
    },
    {
        old: ["qna"],
        new: chrome.runtime.getURL("img/qna.svg"),
    },
    {
        old: ["forum"],
        new: chrome.runtime.getURL("img/forum.svg"),
    },
    {
        old: ["feedback"],
        new: chrome.runtime.getURL("img/checkbox.svg"),
    },
    {
        old: ["pdf"],
        new: chrome.runtime.getURL("img/pdf.svg"),
    },
    {
        old: ["folder"],
        new: chrome.runtime.getURL("img/folder.svg"),
    },
    {
        old: ["vod", "video", "mpeg", "mp4", "mov", "wmv", "avi", "flv", "mkv", "mpg", "mpeg", "m4v", "3gp", "3gpp", "3g2", "3gp2"],
        new: chrome.runtime.getURL("img/video.svg"),
    },
    {
        old: ["audio", "mp3", "wav", "wma", "ogg", "m4a", "flac", "aac", "ac3", "aiff", "m4r", "m4b", "m4p", "m4v", "mp2", "mpa", "mpc", "mpga", "ra", "ram", "wv", "wma"],
        new: chrome.runtime.getURL("img/audio.svg"),
    },
    {
        old: ["spreadsheet"],
        new: chrome.runtime.getURL("img/excel.svg"),
    },
    {
        old: ["document"],
        new: chrome.runtime.getURL("img/word.svg"),
    },
    {
        old: ["powerpoint"],
        new: chrome.runtime.getURL("img/powerpoint.svg"),
    },
    {
        old: ["image", "jpeg", "jpg", "png", "gif", "bmp", "tiff", "psd", "svg", "ai", "eps", "ps", "cdr", "indd", "pct", "ai", "eps", "ps", "cdr", "indd", "pct"],
        new: chrome.runtime.getURL("img/image.svg"),
    },
    {
        old: ["text"],
        new: chrome.runtime.getURL("img/text.svg"),
    },
    {
        old: ["archive"],
        new: chrome.runtime.getURL("img/zip.svg"),
    },
    {
        old: ["marker"],
        new: chrome.runtime.getURL("img/unknown.svg"),
    },
    {
        old: ["courseboard"],
        new: chrome.runtime.getURL("img/board.svg"),
    },
]

// Vectorize icons
function replaceImgs() {
    var imgs = document.getElementsByTagName("img");
    for (let img of imgs) {
        if (!img.src.startsWith("https://klms.kaist.ac.kr/theme/image.php")) continue;
        for (let replace of imgReplaces) {
            if (replace.old.some(o => img.src.replace("https://klms.kaist.ac.kr/theme/image.php", "").includes(o))) {
                img.src = replace.new;
                break;
            }
        }
    }
}

window.addEventListener("load", () => {
    var a = document.querySelector("header.ks-header .fr>ul>li.alram .tooltip-wrap>a>span");
    if (a && (a.innerHTML != "0" || !settings.cleanNotificationCheck)) a.style.visibility = "visible";

    if (settings.themeRadios != "original") {

        replaceImgs();

        var observer = new MutationObserver(replaceImgs);
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function bindKey(k, f) {
        document.addEventListener('keydown', function(e) {
            if (e.key == k) {
                f(e);
            }
        });
    }

    if (pageIs("klms")) {
        if (settings.readNotificationCheck) {
            const bell = document.querySelector("header > div > div.fr > ul > li.alram > div > a");
            if (bell) {
                bell.addEventListener("click", () => {
                    console.log("click bell");
                    const badge = document.querySelector("header > div > div.fr > ul > li.alram > div > a > span");
                    if (badge && settings.cleanNotificationCheck) badge.style.visibility = "hidden";
                    const xmlHttp = new XMLHttpRequest();
                    xmlHttp.open('GET', 'https://klms.kaist.ac.kr/local/lmsnotification/index.php', true);
                    xmlHttp.send();
                });
            }
        }
    }

    if (pageIs("main")) {
        if (settings.panelButtonCheck) {
            const panels = document.querySelectorAll("#wrap > section > div > div.left-block > ul.main-course-list.student > li");
            for (let panel of panels) {
                panel.style.position = "relative";
                const a = document.createElement("a");
                a.href = panel.querySelector("a").href;
                a.style = "position: absolute; margin: 0px; display: block; width: 100%; height: 100%; top: 0; left: 0;";
                panel.appendChild(a);
            }
        }
    }

    if (pageIs("vod")) {
        var video = document.getElementsByTagName("video")[0]
            //var isMac = navigator.platform=="MacIntel"

        var now = 0;
        var trackNow = setInterval(function() {
            now = video.currentTime;
        }, 500);

        function jump(dt) {
            now += dt;
            video.currentTime = now;
        }

        bindKey("ArrowRight", (e) => {
            if (e.altKey && settings.longJumpCheck) jump(settings.longJumpSeconds);
            else if (!e.altKey && settings.jumpCheck) jump(settings.jumpSeconds);
        });
        bindKey("ArrowLeft", (e) => {
            if (e.altKey && settings.longJumpCheck) jump(-settings.longJumpSeconds);
            else if (!e.altKey && settings.jumpCheck) jump(-settings.jumpSeconds);
        });

        ['z', 'ㅋ'].forEach(key => {
            bindKey(key, (e) => {
                if (settings.speedControlCheck) video.playbackRate = 1;
            });
        });
        ['x', 'ㅌ'].forEach(key => {
            bindKey(key, (e) => {
                if (settings.speedControlCheck) video.playbackRate -= settings.speedControlUnit;
            });
        });
        ['c', 'ㅊ'].forEach(key => {
            bindKey(key, (e) => {
                if (settings.speedControlCheck) video.playbackRate += settings.speedControlUnit;
            });
        });
    }

    if (pageIs("room")) {
        if (settings.studentListCheck) {
            const button = document.querySelector("#wrap > section > div.course-info > div > ul:nth-child(3) > li:nth-child(3)");
            if (button) {
                button.setAttribute('onclick', `location.href='https://klms.kaist.ac.kr/user/index.php?id=${/id=(\d+)/.exec(href)[1]}'`);
            }
        }
    }

    if (pageIs("roomWeekAll")) {

        const w = getWeek();

        bindKey("Enter", () => {
            if (settings.enterToWeekCheck) {
                var section = document.getElementById("section-" + w);
                if (section) {
                    window.scroll(0, section.offsetTop - 50);
                }
            }
        });
    }

});