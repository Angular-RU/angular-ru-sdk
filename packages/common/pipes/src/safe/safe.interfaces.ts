import { SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

export type SafeType = SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl;

// eslint-disable-next-line no-restricted-syntax
export enum SafeValueType {
    HTML = 'html',
    STYLE = 'style',
    SCRIPT = 'script',
    URL = 'url',
    RESOURCE_URL = 'resourceUrl'
}
