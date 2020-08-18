export function getBodyRect(): ClientRect | DOMRect | undefined {
    return document.querySelector('body')?.getBoundingClientRect();
}
