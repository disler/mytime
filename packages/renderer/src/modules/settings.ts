// THESE CSS VARIABLES MUST STAY IN SYNC WITH THE CSS IN THE App.vue FILE

export const THEME_BG_COLOR_VAR = "--theme-bg-color"
export const THEME_TEXT_COLOR_VAR = "--theme-text-color"
export const THEME_INPUT_BG_COLOR_VAR = "--theme-input-bg-color"

// DARK VARS
export const THEME_BG_COLOR_DARK = "#222629"
export const THEME_TEXT_COLOR_DARK = "#eeeeee"
export const THEME_INPUT_BG_COLOR_DARK = "#444"

// LIGHT VARS
export const THEME_BG_COLOR_LIGHT = "white"
export const THEME_TEXT_COLOR_LIGHT = "#2c3e50"
export const THEME_INPUT_BG_COLOR_LIGHT = "#eee"



export function goDarkMode():  void {
    document.documentElement.style.setProperty(THEME_BG_COLOR_VAR, THEME_BG_COLOR_DARK)
    document.documentElement.style.setProperty(THEME_TEXT_COLOR_VAR, THEME_TEXT_COLOR_DARK)
    document.documentElement.style.setProperty(THEME_INPUT_BG_COLOR_VAR, THEME_INPUT_BG_COLOR_DARK)
}

export function goLightMode():  void {
    document.documentElement.style.setProperty(THEME_BG_COLOR_VAR, THEME_BG_COLOR_LIGHT)
    document.documentElement.style.setProperty(THEME_TEXT_COLOR_VAR, THEME_TEXT_COLOR_LIGHT)  
    document.documentElement.style.setProperty(THEME_INPUT_BG_COLOR_VAR, THEME_INPUT_BG_COLOR_LIGHT)
}

