// handles all the timer related functionality

import { HoursMinutesSeconds } from "../types";

export const DEFAULT_START_TIME = minutesToSeconds(.1)

/**
 * Convert 300s to {hours: 0, minutes: 5, seconds: 0}
 */
export function convertSecondsToHoursMinutesSeconds(seconds: number): HoursMinutesSeconds {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    const secondsLeft = seconds - (hours * 3600) - (minutes * 60);
    return {
        hours,
        minutes,
        seconds: secondsLeft,
    };
}

/**
 * Convert minutes to seconds
 */
export function minutesToSeconds(minutes: number): number {
    return minutes * 60;
}

/**
 * Format for display
 */
export function formatHoursMinutesSeconds(hms: HoursMinutesSeconds): string {
    const hours = hms.hours === 0 ? "" : hms.hours < 10 ? `0${hms.hours}:` : `${hms.hours}:`;
    const minutes = hms.minutes < 10 ? `0${hms.minutes}` : hms.minutes;
    const seconds = hms.seconds < 10 ? `0${hms.seconds}` : hms.seconds;
    return `${hours}${minutes}:${seconds}`;
}

/**
 * Combines hours, minutes and seconds into seconds
 */
export function convertHoursMinutesSecondsToSeconds(hms: HoursMinutesSeconds): number {
    return hms.hours * 3600 + hms.minutes * 60 + hms.seconds;
}