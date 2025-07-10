import {Pipe, PipeTransform} from '@angular/core';
import {takeSecondItem, takeThirdItem} from '@angular-ru/cdk/array';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil, isTrue} from '@angular-ru/cdk/utils';

import {DetectBrowserPipeOptions} from './detect-browser-pipe';

@Pipe({name: 'detectBrowser'})
export class DetectBrowserPipe implements PipeTransform {
    private static getBrowserMatchers(userAgent?: string): Nullable<RegExpMatchArray> {
        const ua: string = userAgent ?? navigator.userAgent;

        return (
            /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i.exec(ua) ??
            ([] as unknown as RegExpMatchArray)
        );
    }

    private static ensureInternetExplorer(ua: string): string {
        const matcher: Nullable<RegExpMatchArray> =
            /\brv[ :]+(\d+)/g.exec(ua) || ([] as unknown as RegExpMatchArray);

        return `IE ${takeSecondItem(matcher) ?? ''}`;
    }

    private static ensureChrome(ua: string): string {
        return /\b(OPR|Edge?)\/(\d+)/
            .exec(ua)!
            .slice(1)
            .join(' ')
            .replace('OPR', 'Opera')
            .replace('Edg ', 'Edge ');
    }

    private static ensureOtherBrowser(
        matchers: Nullable<RegExpMatchArray>,
        ua: string,
    ): string {
        const matcher: Nullable<RegExpMatchArray> = /version\/(\d+)/i.exec(ua);
        const otherMatchers: Array<Nullable<string>> = isNotNil(takeThirdItem(matchers))
            ? [takeSecondItem(matchers), takeThirdItem(matchers)]
            : // TODO: need refactor deprecated method
              [navigator.appName, navigator.appVersion, '-?'];

        if (matcher !== null) {
            otherMatchers?.splice(1, 1, takeSecondItem(matcher));
        }

        return otherMatchers?.join(' ') ?? '';
    }

    public transform(
        userAgent?: Nullable<string>,
        options?: DetectBrowserPipeOptions,
    ): string {
        let browser: string;
        const ua: string = userAgent ?? navigator.userAgent;
        const matchers: Nullable<RegExpMatchArray> =
            DetectBrowserPipe.getBrowserMatchers(ua);

        if (/trident/i.test(takeSecondItem(matchers) as string)) {
            browser = DetectBrowserPipe.ensureInternetExplorer(ua);
        } else if (
            takeSecondItem(matchers) === 'Chrome' &&
            /\b(OPR|Edge?)\/(\d+)/.exec(ua) !== null
        ) {
            browser = DetectBrowserPipe.ensureChrome(ua);
        } else {
            browser = DetectBrowserPipe.ensureOtherBrowser(matchers, ua);
        }

        return isTrue(options?.kebabCase)
            ? browser?.toLowerCase().replace(/\d+/, '').trim().replace(/\s/, '-')
            : browser;
    }
}
