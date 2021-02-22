var settings = {
    jumpCheck: true,
    jumpSeconds: 10,
    longJumpCheck: true,
    longJumpSeconds: 60,
    speedControlCheck: true,
    speedControlUnit: 0.2,
    themes: {
        ocean: {
            title: "Ocean",
            light: "#004191",
            dark: "#083562",
            darker: "#062a4e"
        },
        olive: { // https://colorswall.com/palette/35108/
            title: "Grass",
            light: "#37671b",
            dark: "#254512",
            darker: "#1c340e"
        },
        wine: { // https://colorswall.com/palette/27722/
            title: "Wine",
            light: "#691f3b",
            dark: "#4b162a",
            darker: "#3c1222"
        },
        blood: { // https://colorswall.com/palette/34822/
            title: "Blood",
            light: "#5b0001",
            dark: "#3d0001",
            darker: "#2e0001"
        },
        steel: {
            title: "Steel",
            light: "#60646b",
            dark: "#494c51",
            darker: "#323438"
        },
        dark: {
            title: "Dark Mode",
            lighter: "#333333",
            light: "#252526",
            dark: "#1e1e1e",
            darker: "#191919",
            lightFont: "#ffffff",
            darkFont: "#969696",
        }
        
    },
    theme: 'wine'
};

var settingsKeys = Object.keys(settings);
var settingsKeysTextAndCheckboxOnly = ["jumpCheck", "jumpSeconds", "longJumpCheck", "longJumpSeconds", "speedControlCheck", "speedControlUnit"];
var dependencies = {
    jumpCheck: ["jumpSeconds", "jumpLabel"],
    longJumpCheck: ["longJumpSeconds", "longJumpLabel"],
    speedControlCheck: ["speedControlUnit", "speedControlLabel"]
}