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
            ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ??
            ([] as unknown as RegExpMatchArray)
        );
    }

    private static ensureInternetExplorer(ua: string): string {
        const matcher: Nullable<RegExpMatchArray> =
            /\brv[ :]+(\d+)/g.exec(ua) || ([] as unknown as RegExpMatchArray);

        return `IE ${takeSecondItem(matcher)}` ?? '';
    }

    private static ensureChrome(ua: string): string {
        return ua
            .match(/\b(OPR|Edge?)\/(\d+)/)!
            .slice(1)
            .join(' ')
            .replace('OPR', 'Opera')
            .replace('Edg ', 'Edge ');
    }

    private static ensureOtherBrowser(
        matchers: Nullable<RegExpMatchArray>,
        ua: string,
    ): string {
        const matcher: Nullable<RegExpMatchArray> = ua.match(/version\/(\d+)/i);
        const otherMatchers: Nullable<string>[] = isNotNil(takeThirdItem(matchers))
            ? [takeSecondItem(matchers), takeThirdItem(matchers)]
            : // TODO: need refactor deprecated method
              // eslint-disable-next-line deprecation/deprecation
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
            ua.match(/\b(OPR|Edge?)\/(\d+)/) !== null
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
