export function ensurePathByPathVariables(path: string, map: Map<string, any>): string {
    let newPath: string = path.toString();
    const parsedUrls: string[] = newPath.match(/{(.*?)}/g) ?? [];

    for (const variable of parsedUrls) {
        const key: string = variable.replaceAll(/[{}]/g, '');

        if (map.has(key)) {
            newPath = newPath.replace(variable, map.get(key));
        }
    }

    return newPath;
}
