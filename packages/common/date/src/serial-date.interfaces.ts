export interface SerialDateConfig {
    fullYear: number;
    month: number;
    date: number;
    hours: number;
    minutes: number;
    seconds: number;
    timeZoneHours: number;
}

export interface SerialDateFormatOptions {
    format?: string;
    timezone?: string;
}
