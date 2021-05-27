export function filterCharacters(text: string, validCharacters: string[] = []): string {
    if (validCharacters.length === 0) {
        return text;
    }

    let result: string = [...text]
        .filter((char: string): boolean => validCharacters.includes(char) || char === ' ')
        .join('');
    result = validCharacters.includes('\\s') ? result : result.replace(/\s+/g, '');

    return result;
}
