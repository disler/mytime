export type WindowMode = 'timer' | 'settings'

export interface StoreInterface {
    timeInSeconds: number;
    windowMode: WindowMode;
    settingsDarkMode: boolean;
}

export interface HoursMinutesSeconds {
    hours: number;
    minutes: number;
    seconds: number;
}