export function ensureRegexp(regexp: string): string {
    let prepared: string = regexp.charAt(0) === '/' ? regexp.slice(1) : regexp;

    prepared =
        prepared.charAt(prepared.length - 1) === '/'
            ? prepared.slice(0, prepared.length - 1)
            : prepared;

    return prepared;
}
