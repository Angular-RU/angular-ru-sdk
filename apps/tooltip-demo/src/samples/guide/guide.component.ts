import {
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import {NgTemplateOutlet} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    NgZone,
    signal,
    VERSION,
    Version,
} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {Tooltip} from '@angular-ru/cdk/tooltip/tooltip.directive';

interface Favorite {
    id: number;
    title: string;
    isMarked: boolean;
}

@Component({
    selector: 'guide',
    imports: [
        CdkFixedSizeVirtualScroll,
        CdkVirtualForOf,
        CdkVirtualScrollViewport,
        MatIcon,
        NgTemplateOutlet,
        Tooltip,
    ],
    templateUrl: './guide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GuideComponent {
    private readonly zone = inject(NgZone);

    public version: Version = VERSION;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers,@typescript-eslint/explicit-function-return-type
    public favorites = signal<Favorite[]>(
        new Array(10000).fill(0).map(
            // eslint-disable-next-line @typescript-eslint/typedef
            (_, i: number): Favorite => ({
                id: i + 1,
                title: Math.random()
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    .toString(36)
                    .replaceAll(/[^a-z]+/g, '')
                    .slice(0, 5),
                isMarked: false,
            }),
        ),
    );

    public markFavorite(favorite: Favorite): void {
        this.zone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-globals
            setTimeout((): void => {
                this.favorites.set(
                    this.favorites().map((item: Favorite): Favorite => {
                        if (favorite.id === item.id) {
                            return {...favorite, isMarked: !favorite.isMarked};
                        }

                        return item;
                    }),
                );
            }, 100);
        });
    }

    public remove(favorite: Favorite): void {
        this.zone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-globals
            setTimeout((): void => {
                this.favorites.set(
                    this.favorites().filter(
                        (item: Favorite): boolean => item.id !== favorite.id,
                    ),
                );
            }, 100);
        });
    }
}
