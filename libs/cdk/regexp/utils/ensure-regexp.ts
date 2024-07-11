export function ensureRegexp(regexp: string): string {
    let prepared: string = regexp.startsWith('/') ? regexp.slice(1) : regexp;

    prepared = prepared.endsWith('/') ? prepared.slice(0, prepared.length - 1) : prepared;

    return prepared;
}
