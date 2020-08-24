import { SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

export type SafeType = SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl;

export const enum SafeValueType {
    HTML = 'html',
    STYLE = 'style',
    SCRIPT = 'script',
    URL = 'url',
    RESOURCE_URL = 'resourceUrl'
}

export type SafeTypeOptions = SafeValueType | 'html' | 'style' | 'script' | 'url' | 'resourceUrl';
