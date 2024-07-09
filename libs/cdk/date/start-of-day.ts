export function startOfDay(date: Date = new Date()): Date {
    return new Date(date.setHours(0, 0, 0, 0));
}
