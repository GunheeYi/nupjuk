// Written by 2021 Gunhee Yi (gunny@kaist.ac.kr).

window.addEventListener("load", () => {
    var a = document.querySelector("header.ks-header .fr>ul>li.alram .tooltip-wrap>a>span");
    if(a && (a.innerHTML!="0" || !settings.cleanNotificationCheck)) a.style.visibility = "visible";
    

    // Vectorize icons
    function replaceImgs(){
        var imgs = document.getElementsByTagName("img");
        var imgReplaces = [
            { 
                old: [["klms.kaist.ac.kr/theme/oklass39/pix/images/header_logo.png"]],
                new: "https://klms.kaist.ac.kr/theme/oklass39/pix/images/logo_m.svg",
                height: "35px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/assign/"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=assign"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=mod_assign", "image=icon"]
                ],
                new: chrome.runtime.getURL("img/text.svg"),
                height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/quiz/"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=quiz"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=mod_quiz", "image=icon"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=quiz", "image=icon"]
                ],
                new: chrome.runtime.getURL("img/quiz.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/url/"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=url"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=mod_url", "image=icon"]
                ],
                new: chrome.runtime.getURL("img/clip.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=mod_resource", "image=icon"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=core", "image=f%2Funknown-24"]
                ],
                new: chrome.runtime.getURL("img/file.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/courseboard/", "/icon/disk"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=courseboard", "image=icon%2Fdisk"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=mod_courseboard", "image=icon%2Fdisk"]
                ],
                new: chrome.runtime.getURL("img/disk.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/courseboard/", "/icon/secret"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=courseboard", "image=icon%2Fsecret"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=mod_courseboard", "image=icon%2Fsecret"]
                ],
                new: chrome.runtime.getURL("img/lock.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/courseboard/", "/icon/reply"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=courseboard", "image=icon%2Freply"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=mod_courseboard", "image=icon%2Freply"]
                ],
                new: chrome.runtime.getURL("img/answer.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/courseboard/", "/icon/notice"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=courseboard", "image=icon%2Fnotice"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=mod_courseboard", "image=icon%2Fnotice"]
                ],
                new: chrome.runtime.getURL("img/star.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/courseboard/", "/icon/new"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=courseboard", "image=icon%2Fnew"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=mod_courseboard", "image=icon%2Fnew"]
                ],
                new: chrome.runtime.getURL("img/new.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/courseboard/", "/icon/up"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=courseboard", "image=icon%2Fup"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=mod_courseboard", "image=icon%2Fup"]
                ],
                new: chrome.runtime.getURL("img/updated.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=courseboard", "image=icon_notice"],
                ],
                new: chrome.runtime.getURL("img/announcement.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=courseboard", "image=icon_qna"],
                ],
                new: chrome.runtime.getURL("img/qna.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=mod_forum", "image=icon"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=forum", "image=icon"]
                ],
                new: chrome.runtime.getURL("img/forum.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=mod_feedback", "image=icon"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=feedback", "image=icon"]
                ],
                new: chrome.runtime.getURL("img/checkbox.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/courseboard/"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=courseboard", "image=icon_default"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=mod_courseboard", "image=icon"]
                ],
                new: chrome.runtime.getURL("img/board.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/pdf"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fpdf"]
                ],
                new: chrome.runtime.getURL("img/pdf.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/folder"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/folder/", "/icon"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=folder"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Ffolder"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=mod_folder", "image=icon"]
                ],
                new: chrome.runtime.getURL("img/folder.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/vod/"],
                    ["klms.kaist.ac.kr/theme/image.php?theme=oklass39", "component=vod"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "f/video"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/mpeg"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "f/avi"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "f/mov"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "f/wmv"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fvideo"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fmpeg"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Favi"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fmov"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fwmv"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=mod_vod", "image=icon"]
                ],
                new: chrome.runtime.getURL("img/video.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "f/audio"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/mp3"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "f/wav"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Faudio"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fmp3"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fwav"]
                ],
                new: chrome.runtime.getURL("img/audio.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/spreadsheet"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fspreadsheet"]
                ],
                new: chrome.runtime.getURL("img/excel.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/document"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fdocument"]
                ],
                new: chrome.runtime.getURL("img/word.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/powerpoint"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fpowerpoint"]
                ],
                new: chrome.runtime.getURL("img/powerpoint.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/image"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/jpeg"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/png"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/bmp"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/tiff"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/gif"],
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "f/eps"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fimage"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fjpeg"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fpng"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fbmp"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Ftiff"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Fgif"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Feps"]
                ],
                new: chrome.runtime.getURL("img/image.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/text"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Ftext"]
                ],
                new: chrome.runtime.getURL("img/text.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/archive"],
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=f%2Farchive"]
                ],
                new: chrome.runtime.getURL("img/zip.svg"),
                // height: "28px"
            },
            {
                old: [
                    ["klms.kaist.ac.kr/theme/image.php", "theme=oklass39", "component=core", "image=i%2Fmarker"]
                ],
                new: chrome.runtime.getURL("img/unknown.svg"),
                // height: "28px"
            }
        ]

        for(let img of imgs) {
            imgReplaces.forEach(replace => {
                if(replace.old.some(substrSet=>substrSet.every(substr=>img.src.includes(substr)))) {
                    img.src = replace.new;
                    if (replace.height) img.style.height = replace.height;
                    if (img.parentElement.parentElement.className == "files") img.style.height = "28px";
                }
            })
        }
    }
    if(settings.themeName!="original"){
        
        replaceImgs();

        var observer = new MutationObserver(replaceImgs);
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Make download buttons
    if(settings.downloadCheck){
        for( let link of document.querySelectorAll("div.activityinstance a.aalink") ) {
            if(link.href.includes("klms.kaist.ac.kr/mod/resource/view.php")) {
                link.parentElement.innerHTML += `
                    &nbsp;
                    <a href="${link.href+"&closeAfterDownload=true"}" target="_blank">
                        <img src="${chrome.runtime.getURL("img/download.svg")}" style="height: 20px;">
                    </a>
                `;
            }
        }
    }
    
    function bindKey(k, f) {
        document.addEventListener('keydown', function(e) {
            if (e.key == k) {
                f(e);
            }
        });
    }

    if(pageIs("vod")){
        var video = document.getElementsByTagName("video")[0]
        //var isMac = navigator.platform=="MacIntel"

        var now = 0;
        var trackNow = setInterval(function(){
            now = video.currentTime;
        }, 500);
        
        // var longJumpPressed = false;
        // window.addEventListener("keydown", (e)=>{ if(e.which==18) longJumpPressed = true; console.log(e)});
        // window.addEventListener("keyup", (e)=>{ if(e==18) longJumpPressed = false; });
        // window.addEventListener("focus", ()=>longJumpPressed=false);
        
        function jump(dt){
            now += dt;
            video.currentTime = now;
        }

        bindKey("ArrowRight", (e) => {
            if(e.altKey && settings.longJumpCheck) jump(settings.longJumpSeconds);
            else if (!e.altKey && settings.jumpCheck) jump(settings.jumpSeconds);
        });
        bindKey("ArrowLeft", (e) => {
            if(e.altKey && settings.longJumpCheck) jump(-settings.longJumpSeconds);
            else if (!e.altKey && settings.jumpCheck) jump(-settings.jumpSeconds);
        });
        bindKey("z", (e) => {
            if(settings.speedControlCheck) video.playbackRate = 1;
        });
        bindKey("x", (e) => {
            if(settings.speedControlCheck) video.playbackRate -= settings.speedControlUnit;
        });
        bindKey("c", (e) => {
            if(settings.speedControlCheck) video.playbackRate += settings.speedControlUnit;
        });
    }

    if (pageIs("roomWeekAll")) {

        const w = getWeek();

        bindKey("Enter", () => {
            if(settings.enterToWeekCheck){
                var section = document.getElementById("section-"+w);
                console.log(section);
                if (section) {
                    window.scroll(0, section.offsetTop - 50);
                }
            } 
        });
    }

    // var a = [
    //     ["#page-course-view-kaistweeks > header > div > div.fr > ul > li.alram > select > option", "Hermione Granger [Enrolled/19980431]"],
    //     ["#wrap > section > div.course-info > div > select > option:nth-child(6)", "Potions (PN101)"],
    //     ["#wrap > section > div.course-info > div > ul.proflist > li:nth-child(1) > div > a > span", "Severus Snape"],
    //     ["#wrap > section > div.course-info > div > ul.proflist > li:nth-child(2) > span", "Aye Have, Noe Idiya, Hugh de Aysis, Tantz R."],
    //     ["#section-1 > div > div.summary > div", `
    //         <br>Due to the global pandemic all lectures are held online. All students should be present at Hogwarts Castle during the last month of the semester to take their mandatory training hours.
    //         <br><br>Textbook - Advanced Potion Making, Libatius Borage, Merge Books.
    //     `],
    //     ["div.course-info > div > ul:nth-child(3) > li:nth-child(1) > span:nth-child(1)", "2021"],
    //     ["div.course-info > div > ul:nth-child(3) > li:nth-child(1) > span:nth-child(2)", "Spring"],
    //     ["div.course-info > div > ul:nth-child(3) > li:nth-child(2) > span:nth-child(2)", "3.0"],
    //     ["div.course-info > div > ul:nth-child(3) > li:nth-child(3) > span", "40"],
    //     ["#module-432731 > div > div > div:nth-child(2) > div > a > span", "Advanced Potion Making by Libatius Borage"],
    //     ["#module-432730 > div > div > div:nth-child(2) > div > a > span", "History of Potion Making"],
    //     ["#module-432704 > div > div > div:nth-child(2) > div.activityinstance > a > span", "Most commonly used ingredients"],
    // ]

    // a.forEach(b => {
    //     c = document.querySelector(b[0])
    //     if(c) c.innerHTML = b[1];
    // });
});