// Written by 2021 Gunhee Yi (gunny@kaist.ac.kr).

// SECTION FOR COMPUTING TIME OF SUNRISE AND SUNSET
// Return days passed since start of year
function dayOfYear(now) {
    // https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}
// Return minutes passed since start of day
function minuteOfDay() {
    return (new Date()).getHours() * 60 + (new Date()).getMinutes();
}
// Approximate time of sunrise and sunset; interpolate between max and min time (ref. region: Daejeon, South Korea)
function sun(t) {
    var temp = 1 - Math.abs(dayOfYear(new Date()) - 133) / 133;
    var sunriseMin = 312,
        sunriseMax = 462;
    var sunsetMin = 1035,
        sunsetMax = 1192;
    if (t == "rise") return sunriseMin + (1 - temp) * (sunriseMax - sunriseMin);
    else if (t == "set") return sunsetMin + temp * (sunsetMax - sunsetMin);
}

// var settingsKeys = Object.keys(settings);

if (document.getElementById("stylesEl")) document.head.removeChild(document.getElementById("stylesEl"));

chrome.storage.sync.get(settingsKeys, function(syncedSettings) {
    settingsKeys.forEach(key => {
        settings[key] = syncedSettings.hasOwnProperty(key) ? syncedSettings[key] : (localStorage.hasOwnProperty(key) ? localStorage[key] : settings[key])
    });

    var href = window.location.href;

    // Automatic redirection to login page
    if (settings.redirectToLoginCheck && pageIs("landing")) window.location.href = "https://klms.kaist.ac.kr/sso2/login.php";

    // Automatic navigation to week "ALL"
    if (settings.weekAllCheck && pageIs("roomWeekNone")) window.location.href += "&section=0";

    var styles = "";

    if (settings.themeRadios != "original") {
        if (href.startsWith("https://klms.kaist.ac.kr/")) {
            const now = minuteOfDay();
            const isNight = (now <= sun("rise")) || (now >= sun("set"));
            // console.log(isNight ? "해가 졌음" : "해가 떠있음");
            const themeRadios = (((settings.darkAtNightCheck && isNight) || settings.themeRadios == "dark") ? "dark" : settings.themeRadios);
            const isDark = themeRadios == "dark";
            const themeObject = getTheme(themeRadios);
            var lighter, light, dark, darker, lightFont, darkFont;
            if (isDark) {
                if (settings.overrideDarkCheck) {
                    lighter = settings.darkLighter;
                    light = settings.darkLight;
                    dark = settings.darkDark;
                    darker = settings.darkDarker;
                    lightFont = settings.darkFontLight;
                    darkFont = settings.darkFontDark;
                } else {
                    lighter = themeObject.lighter;
                    light = themeObject.light;
                    dark = themeObject.dark;
                    darker = themeObject.darker;
                    lightFont = themeObject.lightFont;
                    darkFont = themeObject.darkFont;
                }
            } else {
                if (settings.overrideLightCheck) {
                    light = settings.lightLight;
                    dark = settings.lightDark;
                    darker = settings.lightDarker;
                } else {
                    light = themeObject.light;
                    dark = themeObject.dark;
                    darker = themeObject.darker;
                }
            }
            const lightStyles = `
            header.ks-header,  .main-course-list>li .bt, .course-slider .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active, .course-info .course-bt, .progress-wrap .progressbar span, .pagination li.active a, .btn-primary, .course-slider .swiper-slide>h6 .bt.point, .btn-area.t-center .bt, .modal .modal-dialog .modal-content .modal-header, .manual-wrap .manual-hd, .study-wrap .study-hd, #wrap .group .lnb .m-header, .m-menu .m-header, .course-slider.bg-white .swiper-slide h6, .path-mod-quiz #mod_quiz_navblock .qnbutton.thispage, #page-calendar-view .calendartable tbody tr td.today, #page-calendar-view.path-calendar .maincalendar .calendarmonth ul li .badge.badge-circle.calendar_event_course, .course-slider .swiper-slide>h6, .layerpop-wrap .layerpop .pop-title, .moodle-dialogue-base .moodle-dialogue-wrap .moodle-dialogue-hd.yui3-widget-hd, .quizattempt .singlebutton .btn, .path-mod-quiz .othernav a.endtestlink, .btn.atto_image_urlentrysubmit, .btn.btn-secondary.submit, .nav-pills .nav-link.active, .nav-pills .show>.nav-link, .custom-control-input:checked~.custom-control-label::before, #page-course-view-kaistweeks button.btn.btn-link.text-reset {
                background-color: ${light} !important;
                border-color: ${light};
            }
            .main-title .txt, .course-info .group ul>li span, .week-slider .swiper-container .swiper-slide.on>a, .course-content ul .section.main h3.sectionname em, .course-slider .swiper-slide .tooltip-layer .t-blue, .course-slider .swiper-slide>div p span.t-blue, .course-content ul .section.main .section.img-text>li .actions .progress-txt>strong, .nav-tabs .nav-link.active, .course-slider .swiper-slide>div>em.t-blue, .course-content ul .section.main .section.img-text>li .end-dt, .rnb-menu>ul>li em, .course-content ul .section.main .section.img-text>li .actions .status.t-blue, .course-content ul .section.main .section.img-text>li .actions .status.t-blue2text-primary, .course-content ul .section.main .section.img-text>li .actions .status.ic-alert, .list-box ul li, .text-primary {
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
            .pagination li:not(.active):hover a, .pagination .m-auto a:hover, .icon-box a:hover {
                color: ${light};
                border-color: ${light};
            }
            .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
                border-top-color: ${light};
            }
            .course-slider .swiper-slide>div {
                background-color: #f6f6f6;
            }
            .moodle-dialogue-base .moodle-dialogue-wrap .moodle-dialogue-hd.yui3-widget-hd, .moodle-dialogue-base .closebutton {
                color: #ffffff;
            }
            `;
            var commonStyles = `
                .study-wrap .study-hd, .study-wrap .study-hd .tp .right span {
                    color: #ffffff;
                    border-color: #ffffff;
                }
                span>img {
                    height: 30px;
                    margin: 0 5px 0 5px;
                }
                .courseboard_view .info .files ul li {
                    display: flex;
                    margin-bottom: 3px;
                }
                .courseboard_view .info .files ul li img {
                    max-width: 16px;
                    margin: 0 7px;
                }
                .courseboard_view .info .files ul li a {
                    text-align: left;
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
                .tag-info {
                    background: ${light}
                }
                header.ks-header .fr .manual {
                    color: ${isDark ? lightFont : "#ffffff"};
                    font-weight: 400;
                    border: 1px solid ${isDark ? lightFont : "#ffffff"};
                }
                i.fa.fa-long-arrow-down.fa-fw, i.fa.fa-long-arrow-up.fa-fw, i.icon.fa.fa-star-o.fa-fw, i.icon.fa.fa-star.fa-fw, .text-info  {
                    color: #969696 !important;
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
                    background: url(${chrome.runtime.getURL("img/home_white.svg")}) no-repeat center;
                }
                .quick-menu>ul>li>a.ic-sound {
                    background: url(${chrome.runtime.getURL("img/announcement_white.svg")}) no-repeat center;
                }
                .quick-menu>ul>li>a.ic-talk {
                    background: url(${chrome.runtime.getURL("img/qna_white.svg")}) no-repeat center;
                }
                .quick-menu>ul>li>a.ic-calendar {
                    background: url(${chrome.runtime.getURL("img/calendar_white.svg")}) no-repeat center;
                }
                .quick-menu>ul>li>a.ic-tag {
                    background: url(${chrome.runtime.getURL("img/board_white.svg")}) no-repeat center;
                }
                .quick-menu>ul>li>a.ic-book {
                    background: url(${chrome.runtime.getURL("img/library_white.svg")}) no-repeat center;
                }
                .dndupload-arrow {
                    background: url(${chrome.runtime.getURL("img/download.svg")}) no-repeat center;
                }
                .manual-wrap .manual-txt .top .ic-print {
                    background: url(${chrome.runtime.getURL("img/printer.svg")}) no-repeat left 8px center;
                    background-size: 20px;
                }
                .course-slider .swiper-button-prev {
                    background: ${light} url(${chrome.runtime.getURL("img/select_white.svg")}) no-repeat center;
                    transform: rotate(90deg);
                    background-size: 20px;
                }
                .course-slider .swiper-button-next {
                    background: ${light} url(${chrome.runtime.getURL("img/select_white.svg")}) no-repeat center;
                    transform: rotate(270deg);
                    background-size: 20px;
                }
                .course-slider .swiper-slide>h6:after {
                    background: url(${chrome.runtime.getURL("img/select_white.svg")}) no-repeat center;
                    background-size: 20px;
                }
                .course-slider .swiper-slide>div>em.ic-alert {
                    background: url(${chrome.runtime.getURL("img/warning.svg")}) no-repeat right center;
                    padding-right: 23px;
                }
                .group .lnb .menu-grp>div>ul>li.new-menu>a {
                    background: url(${chrome.runtime.getURL("img/new.svg")}) no-repeat center right 20px;
                    background-size: 20px;
                }
                .m-fixed-menu>ul li.btn-menu>a {
                    background: url(${chrome.runtime.getURL(isDark ? "img/icon_m_plus_dark.svg" : "img/icon_m_plus_light.svg")}) no-repeat center;
                }
                .icon-box .assign {
                    background: url(${chrome.runtime.getURL("img/text.svg")}) no-repeat center;
                }
                .icon-box .choice {
                    background: url(${chrome.runtime.getURL("img/checkbox.svg")}) no-repeat center;
                }
                .icon-box .feedback {
                    background: url(${chrome.runtime.getURL("img/peer_review.svg")}) no-repeat center;
                }
                .icon-box .folder {
                    background: url(${chrome.runtime.getURL("img/folder.svg")}) no-repeat center;
                }
                .icon-box .forum {
                    background: url(${chrome.runtime.getURL("img/forum.svg")}) no-repeat center;
                    display: inline-block;
                    -webkit-background-size: 24px auto;
                    background-size: 24px auto;
                    width: 24px;
                    height: 24px
                }
                .icon-box .liveaction {
                    background: url(${chrome.runtime.getURL("img/live_action.svg")}) no-repeat center;
                }
                .icon-box .vod {
                    background: url(${chrome.runtime.getURL("img/video.svg")}) no-repeat center;
                }
                .icon-box .quiz {
                    background: url(${chrome.runtime.getURL("img/quiz.svg")}) no-repeat center;
                }
                .icon-box .zoom {
                    background: url(${chrome.runtime.getURL("img/zoom.svg")}) no-repeat center;
                }
                .course-content ul .section.main .section.img-text>li .actions .status.ic-alert {
                    background: url(${chrome.runtime.getURL("img/warning.svg")}) no-repeat right center;
                    background-size: 18px;
                }
                header.ks-header .fr>ul>li.alram .tooltip-wrap>a>span {
                    visibility: hidden;
                }
                .lmsnotification .media a .pull-left {
                    padding-right: 0px;
                }
                .activity-pop-list>li>div .pop-img-wrap {
                    border: none;
                }
            `
            var darkStyles = `
                .progress-wrap .progressbar span {
                    background-color: #ffffff !important;
                }
                header.ks-header, .course-content ul .section.main .section.img-text>li, .course-content ul .section.main h3.sectionname, .courseboard_container .search_form, .table>thead>tr>th, #block-region-side-pre .card-body .card-title, .course-slider.bg-white .swiper-slide h6, #ub_keyfield, #page-calendar-view .calendartable thead tr th.header, #page-calendar-view .calendartable tbody tr td.today, .courseboard_view .info, .courseboard_view .content, .courseboard_view .subject h3, .courseboard_view .subject h4, .rnb-menu>p, .progress-wrap .progressbar, .study-wrap .study-hd, .quizinfo, .generaltable>thead>tr>th, .que, table.quizreviewsummary th.cell, .generaltable>tbody>tr>th, .generaltable tbody tr:nth-of-type(odd), .modal-content, .courseboard_view .info .file, .courseboard_view .courseboard_comment, .mform>.form-group.row.fitem:not([data-groupname="buttonar"])>.col-md-3, div.editor_atto_toolbar, .path-mod-folder .filemanager>.ygtvitem, .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link, .table>tbody>tr>th, legend, .well.search_form, .local_ubmessage .form-horizontal .control-group, .local_ubmessage .group_fieldset>.group_fieldset, .moodle-dialogue-base .moodle-dialogue-wrap .moodle-dialogue-hd, .nav-pills .nav-link.active, .nav-pills .show>.nav-link, .modal .modal-dialog .modal-content .modal-header, .tooltip-wrap>.tooltip-layer, #wrap .group .lnb .m-header, .manual-wrap .manual-hd, .menul-list>li>a, .manual-wrap .manual-cont .manual-tab>li.on>a, #page-calendar-view.path-calendar .maincalendar .calendarmonth ul li .badge.badge-circle.calendar_event_course, .course-slider .swiper-slide>h6, .que .formulation, .course-info .group ul>li .tooltip-evt .tooltip-layer>li, .path-mod-url .mod_introbox .no-overflow, .path-mod-forum .d-flex.border.p-2.mb-2.forumpost.focus-target header, .dropdown-menu.show, .dropdown-item:hover, .dropdown-item:focus, .custom-control-input:checked~.custom-control-label::before, .filepicker-filelist .dndupload-target, .filemanager-container .dndupload-target, .path-mod-forum :target>.forumpost:before {
                    background-color: ${lighter} !important;
                }
                .course-info .group, .course-slider .swiper-slide>div, .card, .course-info .course-bt, .select-course div select, .main-course-list>li, .course-content ul li.section.main, .group .lnb .menu-grp>div>ul>li, .m-fixed-menu, #region-main, #block-region-side-pre .card-body .card-text, .rnb-menu, .course-slider .tooltip-evt>.tooltip-layer, .generaltable>tbody>tr>td, .form-control, .block_ubion_shortcut_group_member .group_fieldset>.group_fieldset, .group .lnb .menu-grp>div>ul>li.ic-arrow-r>ul, .local_ubmessage .group_fieldset, .moodle-dialogue-base .moodle-dialogue-wrap, #wrap .group .lnb, .manual-wrap .manual-txt, .menul-list>li>ul, .manual-wrap .result, .manual-wrap .manual-txt .print-txt, .course-info, #page-calendar-view .container-fluid, .course-info .group select option, .assistant .form-horizontal .control-group .control-label, .layerpop-wrap .layerpop .pop-title, #a_year, #a_semester, #a_type, .icon-box a, .todo-box, .notice-box, .menu-box, .week-slider {
                    background-color: ${light} !important;
                }
                #page, #wrap, .bg-white, .login_wrap[data-v-1c64d3c2], .t-center, .block_ubion_shortcut_group_member .group_fieldset, .file-picker .fp-content, .fp-iconview .fp-filename-field .fp-filename, .modal .modal-dialog .modal-content .modal-body, .manual-cont, .table-striped tbody tr:nth-of-type(odd), body .table-striped tbody tr:hover, body .well.search, .layerpop-wrap .layerpop .pop-content, .layerpop-wrap .layerpop, .mform fieldset.collapsible>.fcontainer, .fp-error, .custom-control-label::before, .main-title .txt, .main-title .select-course, .todo-first, .todo-second, .notice-list, .menu-list
                {
                    background-color: ${dark} !important;
                }
                .quick-menu, header.ks-header .fr>ul>li.login-time>a, .group .lnb .menu-grp>div>.more-menu, .course-slider .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active, .pagination li.active a, html {
                    background-color: ${darker} !important;
                }
                .path-mod-assign td.submissionstatussubmitted, .path-mod-assign div.submissionstatussubmitted, .path-mod-assign a:link.submissionstatussubmitted, .path-mod-assign td.earlysubmission, .path-mod-assign div.earlysubmission, .alert-success {
                    background-color: #1c340e !important;
                }
                .alert-danger, .path-mod-assign td.latesubmission, .path-mod-assign a:link.latesubmission, .path-mod-assign div.latesubmission {
                    background-color: #451a18 !important;
                }
                .container, .course-slider .swiper-slide>div p span, .week-slider .swiper-container .swiper-slide a, .course-content ul .section.main .section.img-text>li .instancename, .main-course-list>li>p .teacher em, #wrap.login-wrap .left-list div #bluespan, .login h3[data-v-1c64d3c2], .idk label[data-v-1c64d3c2], a[data-v-1c64d3c2], .krbox>header ul[data-v-1c64d3c2], .notice[data-v-1c64d3c2], .table, .table>thead>tr>th, .btn, #block-region-side-pre .card-body .card-title, #ub_keyfield, .table td, .pagination li.active a, .courseboard_view .info span.title, .course-slider .swiper-slide .tooltip-layer span, .generaltable>thead>tr>th, table.quizreviewsummary th.cell, #page-mod-quiz-review .submitbtns .mod_quiz-next-nav, .path-mod-quiz .othernav a, .que .info .questionflag.editable, .generaltable>tbody>tr>th, .path-mod-assign td.submissionnotgraded, .path-mod-assign td.submissionstatussubmitted, .path-mod-assign div.submissionstatussubmitted, .path-mod-assign a:link.submissionstatussubmitted, .path-mod-assign td.earlysubmission, .path-mod-assign div.earlysubmission, .courseboard_view .info .file, .mform>.form-group.row.fitem:not([data-groupname="buttonar"])>.col-md-3, .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link, .table>tbody>tr>th, legend, .group .lnb .menu-grp>div>ul>li.ic-arrow-r>ul>li a, .inline>select, .course-content ul .section.main .section.img-text>li .actions .status, .moodle-dialogue-base .closebutton::after, .yui3-widget-hd>h3, input[type=text], input[type=password], input[type=number], div.editor_atto_toolbar button .icon, .user_progress_detail .modal-content .modal-header, .alert-danger, .path-mod-assign td.latesubmission, .path-mod-assign a:link.latesubmission, .path-mod-assign div.latesubmission, .all-menu>ul>li>a, .group .lnb .menu-grp>div li a, .menul-list>li>a, .menul-list>li, .menul-list>li>ul>li>a, .menul-list>li>ul>li>ul>li>a, .manual-wrap .manual-cont .manual-tab>li.on>a, .manual-wrap .manual-cont .manual-tab>li>a, .manual-wrap .result div, .manual-wrap .result div small, .manual-wrap .result>p, .manual-wrap .manual-txt .print-txt, .manual-wrap .manual-txt .top .ic-print, .d-block, .main-course-list>li>div>span, .main-course-list>li .bt, #page-calendar-view .container-fluid, #page-calendar-view.path-calendar .maincalendar .calendarmonth ul li>a .eventname, .bt.point, header.ks-header .fr>ul>li.alram .tooltip-wrap>.tooltip-layer ul li em, .layerpop-wrap .layerpop .pop-content, .layerpop-wrap .layerpop .pop-title, .activity-pop-list>li>div .pop-img-wrap, .activity-pop-list>li>div .pop-cnt-wrap span, .course-slider .swiper-slide>div>strong, .moodle-dialogue-confirm .confirmation-message, .moodle-dialogue-base .moodle-dialogue-wrap .moodle-dialogue-hd.yui3-widget-hd, .que .formulation, .course-info .group ul>li .tooltip-evt .tooltip-layer>li, #a_year, #a_semester, #a_type, .path-mod-url .mod_introbox .no-overflow, .path-mod-url .mod_introbox .no-overflow p, .path-mod-forum .d-flex.border.p-2.mb-2.forumpost.focus-target header>div.mr-2+.d-flex.flex-column .h6.font-weight-bold.mb-0+.mb-3, .custom-select, .dropdown-item, .mform fieldset.collapsible legend a.fheader, .fp-pathbar .fp-path-folder, .fp-error, .file-picker .fp-content, .custom-control-input:checked~.custom-control-label::before, .custom-switch .custom-control-label::before, .modal .modal-dialog .modal-content .modal-body, body, .alert-success, .menu-list ul li, .list-box ul li, .text-primary {
                    color: ${darkFont} !important;
                    border-color: ${darkFont} !important;
                }
                .course-info .group ul>li span, .course-info .group select, .course-slider .swiper-slide>div p span.t-blue, .course-content ul .section.main h3.sectionname em, .course-content ul .section.main .section.img-text>li .actions .progress-txt>strong, .week-slider .swiper-container .swiper-slide.on>a, .select-course div select, .main-course-list>li>p>a, .main-course-list>li>p .teacher, #wrap.login-wrap .left-list div h2, .login h2[data-v-1c64d3c2], a[data-v-1c64d3c2]:hover, .card, .pagination li a:hover, .courseboard_view .subject h3, .courseboard_view .subject h4, .courseboard_view .info, .course-slider .swiper-slide .tooltip-layer .t-blue, a:not([class]):hover, .aalink.focus, #page-footer a:not([class]).focus, .arrow_link.focus, a:not([class]).focus, .activityinstance>a.focus, .aalink:focus, #page-footer a:not([class]):focus, .arrow_link:focus, a:not([class]):focus, .activityinstance>a:focus, .manual-wrap .result p em, .group .lnb .menu-grp>div>ul>li>a:hover, .group .lnb .menu-grp>div>ul>li.ic-arrow-r>ul>li a:hover, #page-calendar-view.path-calendar .maincalendar .calendarmonth ul li>a .eventname:hover, .main-title .txt, header.ks-header .fr>ul>li.alram .tooltip-wrap>.tooltip-layer ul li em:hover, .course-slider .swiper-slide>div>em.t-blue, .course-content ul .section.main .section.img-text>li .end-dt, .rnb-menu>ul>li em, .course-content ul .section.main .section.img-text>li .actions .status.t-blue, .dropdown-item:hover, .generaltable tbody tr:hover, .notice-list dt:hover, .menu-list li:hover, .h_main_title h3.main, .week-slider .swiper-container .swiper-slide a:hover {
                    color: ${lightFont} !important;
                    border-color: ${lightFont} !important;
                }
                .course-info .course-bt, .main-course-list>li .bt, .btn-primary, .btn-ub-default, .inline>select, input[type=text], input[type=password], input[type=number], .comment-area textarea, .manual-wrap .manual-cont .manual-tab>li>a, .manual-wrap .result>p, .manual-search .bt, #page-calendar-view .modal.moodle-has-zindex.show .modal-dialog .modal-content .modal-footer>a {
                    border: 1px solid ${darkFont} !important;
                }
                #page-calendar-view .calendartable {
                    border-top: 1px solid ${darkFont} !important;
                }
                .main-course-list>li, .course-content ul li.section.main, .course-content ul .section.main h3.sectionname, .group .lnb .menu-grp>div>ul>li, .course-slider.bg-white .swiper-slide, .group .lnb .menu-grp>div>.more-menu, header.ks-header .fr>ul>li.alram .tooltip-wrap>.tooltip-layer .btn-area, .activity-pop-list, header.ks-header .fr>ul>li.alram .tooltip-wrap>.tooltip-layer, .table>tbody>tr>td, .table>thead>tr>th, .card, #block-region-side-pre .card-body .card-title, .pagination li a, .maincalendar .calendarmonth th, .maincalendar .calendarmonth td, .courseboard_view .subject h3, .courseboard_view .subject h4, .courseboard_view .info, .courseboard_view .content, .courseboard_view .pre_next, .rnb-menu, .rnb-menu>p, .generaltable>thead>tr>th, .generaltable>tbody>tr>td, .generaltable, table.quizreviewsummary th.cell, .generaltable>tbody>tr>th, .modal-header, .modal-footer, .alert-danger, .courseboard_view .comment_list, .mform>.form-group.row.fitem:not([data-groupname="buttonar"])>.col-md-3, .mform>.form-group.row.fitem:not([data-groupname="buttonar"]), .path-mod-folder .filemanager>.ygtvitem, .nav-tabs .nav-item.show .nav-link, .table>tbody>tr>th, .well, .nav-tabs .nav-link, .nav-tabs .nav-link:hover, .block_ubion_shortcut_group_member .group_fieldset, .group .lnb .menu-grp>div>ul>li.ic-arrow-r>ul, .local_ubmessage .form-horizontal .control-group, .local_ubmessage .group_fieldset, .moodle-dialogue-base .moodle-dialogue-wrap, .moodle-dialogue-base .moodle-dialogue-wrap .moodle-dialogue-hd, .file-picker .nav.nav-pills .nav-item, .tooltip-wrap>.tooltip-layer, .all-menu>ul>li>a, .menul-list>li>ul, .menul-list>li, .assistant .form-horizontal .control-group, .assistant .form-horizontal .control-group .control-label, .assistant .form-horizontal, .activity-pop-list>li, #a_year, #a_semester, #a_type, .path-mod-url .mod_introbox .no-overflow, .path-mod-forum .d-flex.border.p-2.mb-2.forumpost.focus-target header, .path-mod-forum .d-flex.body-content-container .post-content-container+.d-flex.flex-wrap, .path-mod-forum .d-flex.border.p-2.mb-2.forumpost.focus-target, legend, .table.discussion-list, .btn.btn-link, .fp-iconview .fp-thumbnail, .fp-iconview .fp-thumbnail img, .fp-select .fp-thumbnail, .fp-select .fp-thumbnail img, .filter-group.my-2.p-2.bg-light.border-radius.border, .border-radius.my-2.p-2.bg-white.border.d-flex.flex-column.flex-md-row.align-items-md-start {
                    border: none !important;
                }
                .course-info .course-bt, .main-course-list>li .bt, .btn, .btn-primary, .btn-ub-default, .pagination li a, #page-mod-quiz-review .submitbtns .mod_quiz-next-nav, .path-mod-quiz .othernav a, .que .info .questionflag.editable, .inline>select, textarea, .file-picker .fp-setlicense>select, .fp-formset input[type="file"], input[type=text], input[type=password], input[type=number], div.editor_atto_toolbar div.atto_group, .manual-search .bt, .manual-wrap .result>p, .manual-wrap .manual-txt .top .ic-print, #page-calendar-view .modal.moodle-has-zindex.show .modal-dialog .modal-content .modal-footer>a, .bt.point, .custom-select, .fp-iconview .fp-filename-field .fp-filename, .fp-select .fp-thumbnail, .week-slider::before, .week-slider::after, .filter-group.my-2.p-2.bg-light.border-radius.border {
                    background-color: transparent !important;
                }
                .main-course-list>li>div>*:before, .custom-switch .custom-control-input:checked~.custom-control-label::after, .custom-switch .custom-control-label::after, .week-slider .swiper-container .swiper-slide:after {
                    background-color: ${darkFont} !important;
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
                #wrap.login-wrap, #page-wrapper #page, #page-login-ssologin, ${ window.location.href.includes("klms.kaist.ac.kr/login/ssologin.php") ? "#region-main>div" : "" } {
                    background-color: #2e3845 !important;
                }
                .btn:hover, .btn-secondary:hover, .bt:hover, .main-course-list>li .bt:hover, header.ks-header .fr>ul>li.login-time>a:hover {
                    background-color: ${lighter}!important;
                    color: ${lightFont} !important;
                    border: 1px sollid ${lightFont} !important
                }
                {
                    background-color: ${light}!important;
                    color: ${lightFont} !important;
                    border: 1px sollid ${lightFont} !important
                }
                {
                    background-color: ${dark}!important;
                    color: ${lightFont} !important;
                    border: 1px sollid ${lightFont} !important
                }

            `;
            
            styles = styles + commonStyles + (isDark ? darkStyles : lightStyles);

            styles += settings.weekSliderCheck ? `
                .week-slider .swiper-container .swiper-slide:not(:last-child):after {
                    margin: 0 3px 0 3px;
                }
                .week-slider.ml-3 {
                    overflow: scroll;
                }
                .week-slider::before, .week-slider::after {
                    content: none !important;
                }
                .week-slider .swiper-button-prev, .week-slider .swiper-button-next {
                    background: none;
                    border: none;
                    width: 0;
                    height: 0;
                }
                .week-slider {
                    padding: 4px 0 4px 0;
                }
            ` : "";
            
            styles += settings.compactViewCheck ? `
                .main-course-list>li {
                    display: inline-block;
                    margin-bottom: 10px;
                    margin-right: 8px;
                    padding: 20px;
                }
                // .main-course-list>li {
                //     width: calc(49.5% - 4px);
                // }
                .main-course-list>li {
                    width: calc(33.33% - 8px);
                }
                // .main-course-list>li:nth-child(even) {
                //     margin-right: 0;
                // }
                .main-course-list>li:nth-child(3n) {
                    margin-right: 0;
                }
                .main-course-list>li>a.bt {
                    display: none;
                }
            ` : "";

            styles += settings.panelButtonCheck ? `
                .main-course-list>li:hover {
                        background-color: ${isDark ? "#2e2e2e" : "#F6F6F6"} !important;
                }
            ` : "";
        }
    }

    if (href.startsWith("https://cais.kaist.ac.kr/")) {
        if (settings.courseHeightRadios!="original") {
            styles += `
                #courseRegistrationList > div:nth-child(9) {
                    height: ${settings.courseHeightRadios=="full" ? "auto" : settings.courseHeight+"px"} !important;
                }
            `;
        }
        
        console.log(styles);
    }

    if (styles) {
        var stylesEl = document.createElement("style");
        stylesEl.id = "stylesEl";
        stylesEl.innerText = styles;
        document.head.appendChild(stylesEl);
    }

});

// https://klms.kaist.ac.kr/theme/oklass39/pix/images/icon_question.png