import {isNil} from './is-nil';
import {isNotNil} from './is-not-nil';

// eslint-disable-next-line max-lines-per-function
export function copyHtml(plainHtml: string): void {
    const element: HTMLDivElement = document.createElement('div');

    element.innerHTML = plainHtml;
    element.style.position = 'absolute';
    element.style.opacity = '0';
    element.style.pointerEvents = 'none';

    document.body.appendChild(element);
    const range: Range = document.createRange();

    range.selectNode(element);

    const selection: Selection | null | undefined = window.getSelection();

    if (isNil(selection)) {
        throw new Error('Selection is not supported by this browser');
    }

    const previousRange: Range | null | undefined =
        selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
    document.body.removeChild(element);

    if (isNotNil(previousRange)) {
        selection.removeAllRanges();
        selection.addRange(previousRange);
    }
}
