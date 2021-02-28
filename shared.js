var settings = {
    jumpCheck: true,
    jumpSeconds: 10,
    longJumpCheck: true,
    longJumpSeconds: 60,
    speedControlCheck: true,
    speedControlUnit: 0.2,
    darkAtNightCheck: false,
    redirectToLoginCheck: false,
    language: "kor",
    themes: [
        {
            name: "ocean",
            titleEng: "Ocean",
            titleKor: "바다",
            light: "#004191",
            dark: "#083562",
            darker: "#062a4e"
        },
        { // https://colorswall.com/palette/35108/
            name: "olive",
            titleEng: "Olive",
            titleKor: "올리브",
            light: "#37671b",
            dark: "#254512",
            darker: "#1c340e"
        },
        { // https://colorswall.com/palette/27722/
            name: "wine",
            titleEng: "Wine",
            titleKor: "와인",
            light: "#691f3b",
            dark: "#4b162a",
            darker: "#3c1222"
        },
        { // https://colorswall.com/palette/34822/
            name: "blood",
            titleEng: "Blood",
            titleKor: "피",
            light: "#5b0001",
            dark: "#3d0001",
            darker: "#2e0001"
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
    themeName: 'wine'
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