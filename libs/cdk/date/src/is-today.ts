export function isToday(someDate: Date): boolean {
    const today: Date = new Date();

    return (
        someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
    );
}
