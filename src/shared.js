// Written by 2021 Gunhee Yi (gunny@kaist.ac.kr).

var settings = {
    jumpCheck: true,
    jumpSeconds: 10,
    longJumpCheck: true,
    longJumpSeconds: 60,
    speedControlCheck: true,
    speedControlUnit: 0.2,
    darkAtNightCheck: true,
    redirectToLoginCheck: true,
    weekAllCheck: true,
    enterToWeekCheck: true,
    cleanNotificationCheck: true,
    downloadCheck: false,
    language: "kor",
    themes: [
        // { // https://colorswall.com/palette/34822/
        //     name: "blood",
        //     titleEng: "Blood",
        //     titleKor: "피",
        //     light: "#5b0001",
        //     dark: "#3d0001",
        //     darker: "#2e0001"
        // },
        { // https://encycolorpedia.kr/d07a00
            name: "orange",
            titleEng: "Orange",
            titleKor: "감귤",
            light: "#d07a00",
            dark: "#87500f",
            darker: "#643d10"
        },
        { // https://www.color-hex.com/color-palette/38422
            name: "mint",
            titleEng: "Mint",
            titleKor: "박하",
            light: "#5c996b",
            dark: "#3d6647",
            darker: "#1f3324"
        },
        { // https://colorswall.com/palette/35108/
            name: "olive",
            titleEng: "Olive",
            titleKor: "올리브",
            light: "#37671b",
            dark: "#254512",
            darker: "#1c340e"
        },
        { // https://www.color-hex.com/color-palette/4666
            name: "teal",
            titleEng: "Teal",
            titleKor: "쇠오리",
            light: "#008080",
            dark: "#006666",
            darker: "#004c4c"
        },
        { // https://www.kaist.ac.kr/kr/html/kaist/010401.html
            name: "cobalt",
            titleEng: "Cobalt",
            titleKor: "쪽",
            light: "#004191",
            dark: "#083562",
            darker: "#062a4e"
        },
        { // https://colorswall.com/palette/27722/
            name: "wine",
            titleEng: "Wine",
            titleKor: "적포도",
            light: "#691f3b",
            dark: "#4b162a",
            darker: "#3c1222"
        },
        { // https://www.color-hex.com/color-palette/22937
            name: "chocolate",
            titleEng: "Chocolate",
            titleKor: "초콜릿",
            light: "#2e1e0a",
            dark: "#201407",
            darker: "#191006"
        },
        {
            name: "steel",
            titleEng: "Steel",
            titleKor: "강철",
            light: "#60646b",
            dark: "#494c51",
            darker: "#323438"
        },
        {
            name: "dark",
            titleEng: "Dark",
            titleKor: "어둡게",
            lighter: "#333333",
            light: "#252526",
            dark: "#1e1e1e",
            darker: "#191919",
            lightFont: "#ffffff",
            darkFont: "#969696",
        }
    ],
    themeName: 'olive'
};

function getTheme(themeName){
    var t;
    settings.themes.forEach(theme => {
        if(theme.name == themeName) t =  theme;
    });
    return t;
}

var settingsKeys = Object.keys(settings);
var settingsKeysTextAndCheckboxOnly = ["jumpCheck", "jumpSeconds", "longJumpCheck", "longJumpSeconds", "speedControlCheck", "speedControlUnit", "darkAtNightCheck",  "redirectToLoginCheck", "weekAllCheck", "enterToWeekCheck", "downloadCheck", "cleanNotificationCheck"];
var dependencies = {
    jumpCheck: ["jumpSeconds", "jumpLabel"],
    longJumpCheck: ["longJumpSeconds", "longJumpLabel"],
    speedControlCheck: ["speedControlUnit", "speedControlLabel"],
    darkAtNightCheck: [],
    redirectToLoginCheck: [],
    weekAllCheck: [],
    enterToWeekCheck: [],
    downloadCheck: [],
    cleanNotificationCheck: []
}

function isIntStr(a) {
    return Number.isInteger(Number(a))
}

function pageIs(name) {
    href = window.location.href;
    switch (name) {
        case "room":
            return href.startsWith("https://klms.kaist.ac.kr/course/view.php?id=")
        case "roomWeekNone": // lecture room without week selection
            return href.startsWith("https://klms.kaist.ac.kr/course/view.php?id=") && isIntStr(href.substring(44));
        case "roomWeekAll": 
            return href.startsWith("https://klms.kaist.ac.kr/course/view.php?id=") && href.endsWith("&section=0") && isIntStr(href.substring(44, href.length-10));
        case "landing": 
            return href.startsWith("https://klms.kaist.ac.kr/login/ssologin.php");
        case "vod":
            return document.getElementsByTagName("video")[0] != undefined;
    }
}

const semesters = [
    { year: 2018, term: 1, start: new Date(2018, 2-1, 26), end: new Date(2018,6-1,18) },
    { year: 2018, term: 2, start: new Date(2018, 6-1, 25), end: new Date(2018,8-1,10) },
    { year: 2018, term: 3, start: new Date(2018, 8-1, 27), end: new Date(2018,12-1,14) },
    { year: 2018, term: 4, start: new Date(2018, 12-1, 17), end: new Date(2019,1-1,25) },

    { year: 2019, term: 1, start: new Date(2019, 2-1, 25), end: new Date(2019,6-1,14) },
    { year: 2019, term: 2, start: new Date(2019, 6-1, 24), end: new Date(2019,8-1,9) },
    { year: 2019, term: 3, start: new Date(2019, 9-1, 2), end: new Date(2019,12-1,20) },
    { year: 2019, term: 4, start: new Date(2019, 12-1, 23), end: new Date(2020,1-1,31) },

    { year: 2020, term: 1, start: new Date(2020, 3-1, 16), end: new Date(2020,7-1,3) },
    { year: 2020, term: 2, start: new Date(2020, 7-1, 6), end: new Date(2020,8-1,21) },
    { year: 2020, term: 3, start: new Date(2020, 8-1, 31), end: new Date(2020,12-1,18) },
    { year: 2020, term: 4, start: new Date(2020, 12-1, 21), end: new Date(2021,1-1,29) },

    { year: 2021, term: 1, start: new Date(2021, 3-1, 1), end: new Date(2021,6-1,18) },
    { year: 2021, term: 2, start: new Date(2021, 6-1, 28), end: new Date(2021,8-1,20) },
    { year: 2021, term: 3, start: new Date(2021, 8-1, 30), end: new Date(2021,12-1,17) },
    { year: 2021, term: 4, start: new Date(2021, 12-1, 20), end: new Date(2022,1-1,28) },

    { year: 2022, term: 1, start: new Date(2022, 2-1, 28), end: new Date(2022,6-1,17) },
    { year: 2022, term: 2, start: new Date(2022, 6-1, 27), end: new Date(2022,8-1,19) },
    { year: 2022, term: 3, start: new Date(2022, 8-1, 29), end: new Date(2022,12-1,16) },
    { year: 2022, term: 4, start: new Date(2022, 12-1, 19), end: new Date(2023,1-1,27) },

    // { year: 2023, term: 1, start: new Date(2022, 2-1, 28), end: new Date(2023,6-1,18) },
    // { year: 2023, term: 2, start: new Date(2022, 6-1, 28), end: new Date(2023,8-1,20) },
    // { year: 2023, term: 3, start: new Date(2022, 8-1, 30), end: new Date(2023,12-1,17) },
    // { year: 2023, term: 4, start: new Date(2022, 12-1, 20), end: new Date(2024,1-1,28) },
];

function getWeek() {
    const now = new Date();
    for(s of semesters) {
        if (s.start <= now && now <= s.end) return Math.ceil((now-s.start)/7/24/60/60/1000);
    }
}

function getSemesterString(s) {
    return `${s.year} ${["Spring", "Summer", "Fall", "Winter"][s.term-1]}`;
}