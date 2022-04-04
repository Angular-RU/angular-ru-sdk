import { isNotNil } from '@angular-ru/cdk/utils';

// eslint-disable-next-line max-lines-per-function
export function unpatchEvents(): void {
    if (typeof window !== 'undefined') {
        const windowInstance: Window & any = window as any;

        if (isNotNil(windowInstance.Zone)) {
            throw new Error('You must import `@angular-ru/cdk/zone.js/unpatch-events` before importing rxjs');
        }

        windowInstance.__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
        windowInstance.__Zone_disable_on_property = true; // disable patch onProperty such as onclick

        windowInstance.__zone_symbol__UNPATCHED_EVENTS = [
            'scroll',
            'mouseenter',
            'mouseleave',
            'mousemove',
            'mouseover',
            'mouseout',
            'mousewheel',
            'message'
        ];

        // black list scroll event handler for onProp
        const targets: any[] = [window, Document, HTMLBodyElement, HTMLElement, document.body, WebSocket];

        windowInstance.__Zone_ignore_on_properties = [];

        for (const target of targets) {
            windowInstance.__Zone_ignore_on_properties?.push({
                target,
                ignoreProperties: [
                    'scroll',
                    'mouseenter',
                    'mouseleave',
                    'mousemove',
                    'mouseover',
                    'mouseout',
                    'mousewheel',
                    'dragover',
                    'drop',
                    'close',
                    'error',
                    'open',
                    'message'
                ]
            });
        }
    }
}
