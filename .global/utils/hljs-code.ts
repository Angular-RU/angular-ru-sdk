import { Any } from '@angular-ru/cdk/typings';

declare const hljs: Any;

export function hlJsCode(): void {
    const list: Element[] = Array.from(document.querySelectorAll('pre code') ?? []);

    for (const block of list) {
        hljs.highlightBlock(block);
    }
}
