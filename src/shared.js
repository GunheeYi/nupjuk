// Written by 2021 Gunhee Yi (gunny@kaist.ac.kr).

var settings = {
    jumpCheck: true,
    jumpSeconds: 10,
    longJumpCheck: true,
    longJumpSeconds: 60,
    speedControlCheck: true,
    speedControlUnit: 0.2,
    darkAtNightCheck: false,
    redirectToLoginCheck: true,
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
var settingsKeysTextAndCheckboxOnly = ["jumpCheck", "jumpSeconds", "longJumpCheck", "longJumpSeconds", "speedControlCheck", "speedControlUnit", "darkAtNightCheck",  "redirectToLoginCheck"];
var dependencies = {
    jumpCheck: ["jumpSeconds", "jumpLabel"],
    longJumpCheck: ["longJumpSeconds", "longJumpLabel"],
    speedControlCheck: ["speedControlUnit", "speedControlLabel"],
    darkAtNightCheck: [],
    redirectToLoginCheck: []
}