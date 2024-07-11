import {
    SafeHtml,
    SafeResourceUrl,
    SafeScript,
    SafeStyle,
    SafeUrl,
} from '@angular/platform-browser';

export type SafeType = SafeHtml | SafeResourceUrl | SafeScript | SafeStyle | SafeUrl;
