import { coerceBoolean } from '@angular-ru/cdk/coercion';

declare const document: any;

/**
 * @deprecated Use `copyString`
 */
export const copyBuffer: (str: string) => void = copyString;

export function copyString(str: string): void {
    const firstIndex: number = 0;
    const element: HTMLTextAreaElement = document.createElement('textarea');

    element.value = str;
    element.setAttribute('readonly', '');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);
    const selected: Range | false =
        document?.getSelection()?.rangeCount > firstIndex ? document?.getSelection().getRangeAt(firstIndex) : false;

    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);

    if (coerceBoolean(selected as any)) {
        document?.getSelection()?.removeAllRanges();
        document?.getSelection()?.addRange(selected);
    }
}
