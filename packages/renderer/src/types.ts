export type HotKey = 1 | 2 | 3

export type WindowMode = 'timer' | 'settings'

export interface StoreInterface {
    timeInSeconds: number;
    windowMode: WindowMode;
    settingsDarkMode: boolean;
    hotKey1Time: number;
    hotKey2Time: number;
    hotKey3Time: number;
}

export interface HoursMinutesSeconds {
    hours: number;
    minutes: number;
    seconds: number;
}

export interface UserConfig {
    
}