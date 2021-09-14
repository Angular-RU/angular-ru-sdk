export function toISOStringWithoutTimezone(inputDate: Date): string {
    const date: Date = new Date(inputDate);
    const shiftInMinutes: number = date.getMinutes() - date.getTimezoneOffset();
    const localDateTime: Date = new Date(date.setMinutes(shiftInMinutes));

    return localDateTime.toISOString().slice(0, -1);
}
