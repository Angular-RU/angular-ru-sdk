import { Any } from '@angular-ru/common/typings';

export function ensurePathByPathVariables(path: string, map: Map<string, Any>): string {
    const parsedUrls: string[] = path.match(/\{(.*?)\}/g) ?? [];

    for (const variable of parsedUrls) {
        const key: string = variable.replace(/{|}/g, '');

        if (map.has(key)) {
            path = path.replace(variable, map.get(key));
        }
    }

    return path;
}
