// Written by 2021 Gunhee Yi (gunny@kaist.ac.kr).
var settingsKeys = Object.keys(settings);
var stylesEl;

chrome.storage.sync.get(settingsKeys, function(syncedSettings) {
    console.log(settings);
    settingsKeys.forEach(key => {
        settings[key] = syncedSettings.hasOwnProperty(key) ? syncedSettings[key] : (localStorage.hasOwnProperty(key) ? localStorage[key] : settings[key])
    });

    var isDark = settings.theme=="dark";
    
    var light = settings.themes[settings.theme].light;
    var dark = settings.themes[settings.theme].dark;
    var darker = settings.themes[settings.theme].darker;
    var lighter, lightFont, darkFont;
    if(isDark) {
        lighter = settings.themes[settings.theme].lighter;
        lightFont = settings.themes[settings.theme].lightFont;
        darkFont = settings.themes[settings.theme].darkFont;
    }

    var lightStyles = `
        header.ks-header,  .main-course-list>li .bt, .course-slider .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active, .course-info .course-bt, .progress-wrap .progressbar span, .pagination li.active a, .btn-primary, .course-slider .swiper-slide>h6 .bt.point, .btn-area.t-center .bt, .modal .modal-dialog .modal-content .modal-header, .manual-wrap .manual-hd, .study-wrap .study-hd, #wrap .group .lnb .m-header, .m-menu .m-header, .course-slider.bg-white .swiper-slide h6 {
            background-color: ${light} !important;
            border-color: ${light};
        }
        .main-title .txt, .course-info .group ul>li span, .week-slider .swiper-container .swiper-slide.on>a, .course-content ul .section.main h3.sectionname em, .course-slider .swiper-slide .tooltip-layer .t-blue, .course-slider .swiper-slide>div p span.t-blue, .course-content ul .section.main .section.img-text>li .actions .progress-txt>strong, .nav-tabs .nav-link.active {
            color: ${light} !important;
            border-bottom: ${light} !important;
        }
        .manual-wrap .manual-cont .manual-tab>li.on>a, .manual-search .bt, .btn-primary:hover {
            background-color: ${dark} !important;
            border-color: ${dark};
        }
        .manual-wrap .manual-cont .manual-tab>li>a {
            border: 1px solid ${dark};
        }
        .quick-menu, header.ks-header .fr>ul>li.login-time>a {
            background-color: ${darker};
        }
        
    `;
    var commonStyles = `
        header.ks-header .fr .manual, .study-wrap .study-hd, .study-wrap .study-hd .tp .right span {
            color: #ffffff;
            border-color: #ffffff;
        }
        span>img {
            height: 30px;
            margin-right: 5px;
        }
        header.ks-header .hd-logo {
            padding: 0;
        }
        .study-wrap .study-hd .tp .bt-script {
            border: none;
        }
        a:not([class]):focus {
            background-color: transparent;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        header.ks-header .fr>ul>li:not(:last-of-type):after {
            background: #ffffff;
        }
        header.ks-header .fr>ul>li select {
            background: ${isDark ? lighter : light} url(${chrome.runtime.getURL("img/select_white.svg")}) no-repeat right center;
            background-size: 15px;
            text-shadow: none;
        }
        .slider-btn-area>span {
            background: ${isDark ? lighter : light} url(${chrome.runtime.getURL("img/select_white.svg")}) no-repeat center;
        }
        .course-info .group select {
            background: url(${chrome.runtime.getURL("img/select_"+(isDark?"white":"black")+".svg")}) no-repeat center right ${isDark ? "20px" : "0px"};
            ${isDark ? "background-size: 40px;" : ""}
            text-shadow: none;
        }
        .group .lnb .menu-grp>div>.more-menu:after {
            background: url(${chrome.runtime.getURL("img/select_gray.svg")}) no-repeat center;
            backgroud-size: 10px;
        }
        .group .lnb .menu-grp>div>ul>li.ic-arrow-r>a:after {
            background: url(${chrome.runtime.getURL("img/select_gray.svg")}) no-repeat center right 15px;
            background-size: 10px;
            transform: rotate(270deg);
        }
        .week-slider .swiper-button-prev, #page-calendar-view .arrow_link.previous {
            background: url(${chrome.runtime.getURL("img/select_gray.svg")}) no-repeat center;
            transform: rotate(90deg);
            background-size: 15px;
        }
        .week-slider .swiper-button-next, #page-calendar-view .arrow_link.next {
            background: url(${chrome.runtime.getURL("img/select_gray.svg")}) no-repeat center;
            transform: rotate(270deg);
            background-size: 15px;
        }
        .course-content ul .section.main.hide h3.sectionname {
            background: url(${chrome.runtime.getURL("img/select_gray.svg")}) no-repeat center right 20px;
            background-size: 20px;
        }
        .course-content ul .section.main h3.sectionname {
            background: url(${chrome.runtime.getURL("img/select_gray_reversed.svg")}) no-repeat center right 20px;
            background-size: 20px;
        }
        header.ks-header .fr>ul>li.alram .tooltip-wrap>a:before {
            background: url(${chrome.runtime.getURL("img/bell.svg")}) no-repeat center;
        }
        header.ks-header .hd-menu {
            background: url(${chrome.runtime.getURL("img/menu.svg")}) no-repeat center;
        }
        header.ks-header .fr>ul>li.login-time>p {
            background: ${isDark ? light : dark} url(${chrome.runtime.getURL("img/clock.svg")}) no-repeat left 13px center;
            background-size: 14px;
        }
        .quick-menu>ul>li>a.ic-home {
            background: url(${chrome.runtime.getURL("img/home.svg")}) no-repeat center;
        }
        .quick-menu>ul>li>a.ic-sound {
            background: url(${chrome.runtime.getURL("img/announcement.svg")}) no-repeat center;
        }
        .quick-menu>ul>li>a.ic-talk {
            background: url(${chrome.runtime.getURL("img/qna.svg")}) no-repeat center;
        }
        .quick-menu>ul>li>a.ic-calendar {
            background: url(${chrome.runtime.getURL("img/calendar.svg")}) no-repeat center;
        }
        .quick-menu>ul>li>a.ic-tag {
            background: url(${chrome.runtime.getURL("img/bulletin.svg")}) no-repeat center;
        }
        .quick-menu>ul>li>a.ic-book {
            background: url(${chrome.runtime.getURL("img/library.svg")}) no-repeat center;
        }
        .dndupload-arrow {
            
        }
    `
    var darkStyles = `
        .progress-wrap .progressbar span {
            background-color: #ffffff !important;
        }
        header.ks-header, .course-content ul .section.main .section.img-text>li, .course-content ul .section.main h3.sectionname, .courseboard_container .search_form, .table>thead>tr>th, #block-region-side-pre .card-body .card-title, .course-slider.bg-white .swiper-slide h6, #ub_keyfield, #page-calendar-view .calendartable thead tr th.header, #page-calendar-view .calendartable tbody tr td.today, .courseboard_view .info, .courseboard_view .content, .courseboard_view .subject h3, .courseboard_view .subject h4, .rnb-menu>p, .progress-wrap .progressbar, .study-wrap .study-hd, .quizinfo, .generaltable>thead>tr>th, .que, table.quizreviewsummary th.cell, .generaltable>tbody>tr>th, .generaltable tbody tr:nth-of-type(odd), .modal-content, .courseboard_view .info .file, .courseboard_view .courseboard_comment, .mform>.form-group.row.fitem:not([data-groupname="buttonar"])>.col-md-3, div.editor_atto_toolbar, .path-mod-folder .filemanager>.ygtvitem, .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link, .table>tbody>tr>th, legend, .well.search_form, .local_ubmessage .form-horizontal .control-group {
            background-color: ${lighter} !important;
        }
        .course-info .group, .course-slider .swiper-slide>div, .card, .course-info .course-bt, .select-course div select, .main-course-list>li, .course-content ul li.section.main, .group .lnb .menu-grp>div>ul>li, .m-fixed-menu, #region-main, #block-region-side-pre .card-body .card-text, .rnb-menu, .course-slider .tooltip-evt>.tooltip-layer, .generaltable>tbody>tr>td, .form-control, .block_ubion_shortcut_group_member .group_fieldset>.group_fieldset, .group .lnb .menu-grp>div>ul>li.ic-arrow-r>ul {
            background-color: ${light} !important;
        }
        #page, #wrap, .bg-white, .login_wrap[data-v-1c64d3c2], .t-center, .block_ubion_shortcut_group_member .group_fieldset {
            background-color: ${dark} !important;
        }
        .quick-menu, header.ks-header .fr>ul>li.login-time>a, .group .lnb .menu-grp>div>.more-menu, .course-slider .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active, .pagination li.active a {
            background-color: ${darker} !important;
        }
        .path-mod-assign td.submissionstatussubmitted, .path-mod-assign div.submissionstatussubmitted, .path-mod-assign a:link.submissionstatussubmitted, .path-mod-assign td.earlysubmission, .path-mod-assign div.earlysubmission {
            background-color: #1c340e !important;
        }
        .alert-danger {
            background-color: #6e211e;
            color: #f6d9d8;
        }
        .course-info .group ul>li span, .course-info .group select, .course-slider .swiper-slide>div p span.t-blue, .course-content ul .section.main h3.sectionname em, .course-content ul .section.main .section.img-text>li .actions .progress-txt>strong, .week-slider .swiper-container .swiper-slide.on>a, .select-course div select, .main-course-list>li>p>a, .main-course-list>li>p .teacher, #wrap.login-wrap .left-list div h2, .login h2[data-v-1c64d3c2], a[data-v-1c64d3c2]:hover, .card, .pagination li a:hover, .courseboard_view .subject h3, .courseboard_view .subject h4, .courseboard_view .info, .course-slider .swiper-slide .tooltip-layer .t-blue, a:not([class]):hover, .aalink.focus, #page-footer a:not([class]).focus, .arrow_link.focus, a:not([class]).focus, .activityinstance>a.focus, .aalink:focus, #page-footer a:not([class]):focus, .arrow_link:focus, a:not([class]):focus, .activityinstance>a:focus {
            color: ${lightFont} !important;
            border-color: ${lightFont};
        }
        .container, .course-slider .swiper-slide>div p span, .week-slider .swiper-container .swiper-slide>a, .course-content ul .section.main .section.img-text>li .instancename, .main-course-list>li>p .teacher em, #wrap.login-wrap .left-list div #bluespan, .login h3[data-v-1c64d3c2], .idk label[data-v-1c64d3c2], a[data-v-1c64d3c2], .krbox>header ul[data-v-1c64d3c2], .notice[data-v-1c64d3c2], .table, .table>thead>tr>th, .btn, #block-region-side-pre .card-body .card-title, #ub_keyfield, .table td, .pagination li.active a, .courseboard_view .info span.title, .course-slider .swiper-slide .tooltip-layer span, .generaltable>thead>tr>th, table.quizreviewsummary th.cell, #page-mod-quiz-review .submitbtns .mod_quiz-next-nav, .path-mod-quiz .othernav a, .que .info .questionflag.editable, .generaltable>tbody>tr>th, .path-mod-assign td.submissionnotgraded, .path-mod-assign td.submissionstatussubmitted, .path-mod-assign div.submissionstatussubmitted, .path-mod-assign a:link.submissionstatussubmitted, .path-mod-assign td.earlysubmission, .path-mod-assign div.earlysubmission, .courseboard_view .info .file, .mform>.form-group.row.fitem:not([data-groupname="buttonar"])>.col-md-3, .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link, .table>tbody>tr>th, legend, .group .lnb .menu-grp>div>ul>li.ic-arrow-r>ul>li a {
            color: ${darkFont} !important;
            border-color: ${darkFont} !important;
        }
        .course-info .course-bt, .main-course-list>li .bt, .btn-primary, .btn-ub-default, select {
            border: 1px solid ${darkFont} !important;
        }
        #page-calendar-view .calendartable {
            border-top: 1px solid ${darkFont} !important;
        }
        .main-course-list>li, .course-content ul li.section.main, .course-content ul .section.main h3.sectionname, .group .lnb .menu-grp>div>ul>li, .course-slider.bg-white .swiper-slide, .group .lnb .menu-grp>div>.more-menu, header.ks-header .fr>ul>li.alram .tooltip-wrap>.tooltip-layer .btn-area, .activity-pop-list, header.ks-header .fr>ul>li.alram .tooltip-wrap>.tooltip-layer, .table>tbody>tr>td, .table>thead>tr>th, .card, #block-region-side-pre .card-body .card-title, .pagination li a, .maincalendar .calendarmonth th, .maincalendar .calendarmonth td, .courseboard_view .subject h3, .courseboard_view .subject h4, .courseboard_view .info, .courseboard_view .content, .courseboard_view .pre_next, .rnb-menu, .rnb-menu>p, .generaltable>thead>tr>th, .generaltable>tbody>tr>td, .generaltable, table.quizreviewsummary th.cell, .generaltable>tbody>tr>th, .modal-header, .modal-footer, .alert-danger, .courseboard_view .comment_list, .mform>.form-group.row.fitem:not([data-groupname="buttonar"])>.col-md-3, .mform>.form-group.row.fitem:not([data-groupname="buttonar"]), .path-mod-folder .filemanager>.ygtvitem, .nav-tabs .nav-item.show .nav-link, .table>tbody>tr>th, .well, .nav-tabs .nav-link, .nav-tabs .nav-link:hover, .block_ubion_shortcut_group_member .group_fieldset, .group .lnb .menu-grp>div>ul>li.ic-arrow-r>ul, .local_ubmessage .form-horizontal .control-group {
            border: none !important;
        }
        .course-info .course-bt, .main-course-list>li .bt, .btn, .btn-primary, .btn-ub-default, .pagination li a, #page-mod-quiz-review .submitbtns .mod_quiz-next-nav, .path-mod-quiz .othernav a, .que .info .questionflag.editable, select {
            background-color: transparent !important;
        }
        .close {
            color: ${darkFont};
            text-shadow: none;
        }
        ul.nav-tabs, .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
            border-top: none;
            border-left: none;
            border-right: none;
            border-bottom-color: ${darkFont} !important;
        }
    `;

    // Load legacy styles
    // var legacyStylesEl = document.createElement("link");
    // legacyStylesEl.href = "https://klms.kaist.ac.kr/theme/styles.php/oklass39/1613905693_1/all"
    // legacyStylesEl.rel = "stylesheet";
    // document.head.appendChild(legacyStylesEl);
    
    if(stylesEl) document.head.removeChild(stylesEl);
    var styles = commonStyles + (isDark ? darkStyles : lightStyles);
    stylesEl = document.createElement("style");
    stylesEl.innerText = styles;
    document.head.appendChild(stylesEl);

    var imgs = document.getElementsByTagName("img");

    var imgReplaces = [
        { 
            old: ["klms.kaist.ac.kr/theme/oklass39/pix/images/header_logo.png"],
            new: "https://klms.kaist.ac.kr/theme/oklass39/pix/images/logo_m.svg",
            height: "35px"
        },
        {
            old: ["klms.kaist.ac.kr/theme/image.php/oklass39/vod/"],
            new: chrome.runtime.getURL("img/video.svg"),
        },
        {
            old: ["klms.kaist.ac.kr/theme/image.php/oklass39/assign/"],
            new: chrome.runtime.getURL("img/assignment.svg"),
        },
        {
            old: ["klms.kaist.ac.kr/theme/image.php/oklass39/quiz/"],
            new: chrome.runtime.getURL("img/quiz.svg"),
        },
        {
            old: ["klms.kaist.ac.kr/theme/image.php/oklass39/courseboard/", "/icon/disk"],
            new: chrome.runtime.getURL("img/disk.svg"),
        },
        {
            old: ["klms.kaist.ac.kr/theme/image.php/oklass39/courseboard/", "/icon/secret"],
            new: chrome.runtime.getURL("img/lock.svg"),
        },
        {
            old: ["klms.kaist.ac.kr/theme/image.php/oklass39/courseboard/", "/icon/reply"],
            new: chrome.runtime.getURL("img/answer.svg"),
        },
        {
            old: ["klms.kaist.ac.kr/theme/image.php/oklass39/courseboard/", "/icon/notice"],
            new: chrome.runtime.getURL("img/star.svg"),
        },
        {
            old: ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/pdf-24"],
            new: chrome.runtime.getURL("img/pdf.svg")
        },
        {
            old: ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/pdf"],
            new: chrome.runtime.getURL("img/pdf.svg"),
            height: "20px"
        },
        {
            old: ["klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/folder-24"],
            new: chrome.runtime.getURL("img/folder.svg"),
            height: "20px"
        },
        {
            old: ["klms.kaist.ac.kr/theme/image.php/oklass39/folder/", "/icon"],
            new: chrome.runtime.getURL("img/folder.svg"),
            height: "20px"
        },
        {
            old: ["https://klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/mpeg-24"],
            new: chrome.runtime.getURL("img/video.svg"),
        },
        {
            old: ["https://klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/spreadsheet-24"],
            new: chrome.runtime.getURL("img/excel.svg"),
        },
        {
            old: ["https://klms.kaist.ac.kr/theme/image.php/oklass39/core/", "/f/spreadsheet"],
            new: chrome.runtime.getURL("img/excel.svg"),
        }
    ]

    for(let img of imgs) {
        imgReplaces.forEach(replace => {
            if(replace.old.every(substr=>img.src.includes(substr))) {
                img.src = replace.new;
                if (replace.height) img.style.height = replace.height;
            }
        })
        /*
        if(img.src=="https://klms.kaist.ac.kr/theme/oklass39/pix/images/header_logo.png") {
            img.src = "https://klms.kaist.ac.kr/theme/oklass39/pix/images/logo_m.svg";
            //img.style.width = "100px";
            img.style.height = "35px";
        }
        */
    }

    var video = document.getElementsByTagName("video")[0]
    if(video){
        //var isMac = navigator.platform=="MacIntel"
        

        var now = 0;
        var trackNow = setInterval(function(){
            now = video.currentTime;
        }, 500)
        
        var longJumpPressed = false;
        window.onkeydown = function(e){ if(e.which==18) longJumpPressed = true; };
        window.onkeyup = function(e){ if(e.which==18) longJumpPressed = false; };
        
        function jump(dt){
            now += dt;
            video.currentTime = now;
        }
        
        document.addEventListener('keydown', function (event) {
            switch(event.key) {
                case 'm': break;
                case 'f': break;
                case "ArrowRight":
                    if(longJumpPressed && settings.longJumpCheck) jump(settings.longJumpSeconds);
                    else if (!longJumpPressed && settings.jumpCheck) jump(settings.jumpSeconds);
                    break;
                case "ArrowLeft":
                    if(longJumpPressed && settings.longJumpCheck) jump(-settings.longJumpSeconds);
                    else if (!longJumpPressed && settings.jumpCheck) jump(-settings.jumpSeconds);
                    break;
                case "ArrowUp": break;
                case "ArrowDown": break;
                case " ": break;
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    break;
                case 'z':
                    if(settings.speedControlCheck) video.playbackRate = 1;
                    break;
                case 'x':
                    if(settings.speedControlCheck) video.playbackRate -= settings.speedControlUnit;
                    break;
                case 'c':
                    if(settings.speedControlCheck) video.playbackRate += settings.speedControlUnit;
                    break;
            }
        });
    }

});

//TODO
// 화면 줄였을 때 나타나는 플러스 버튼 색
// https://klms.kaist.ac.kr/course/view.php?id=117377 에 있는 스위치