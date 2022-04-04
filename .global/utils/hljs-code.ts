declare const hljs: any;

export function hlJsCode(): void {
    const list: Element[] = Array.from(document.querySelectorAll('pre code') ?? []);

    for (const block of list) {
        hljs.highlightBlock(block);
    }
}
