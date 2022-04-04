import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, VERSION, Version } from '@angular/core';

interface Favorite {
    id: number;
    title: string;
    isMarked: boolean;
}

@Component({
    selector: 'guide',
    templateUrl: './guide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuideComponent {
    public version: Version = VERSION;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers,@typescript-eslint/explicit-function-return-type
    public favorites: Favorite[] = Array.from({ length: 10000 })
        .fill(0)
        .map(
            // eslint-disable-next-line @typescript-eslint/typedef
            (_, i: number): Favorite => ({
                id: i + 1,
                title: Math.random()
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    .toString(36)
                    .replace(/[^a-z]+/g, '')
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    .substr(0, 5),
                isMarked: false
            })
        );

    constructor(private readonly zone: NgZone, protected readonly cd: ChangeDetectorRef) {}

    public markFavorite(favorite: Favorite): void {
        this.zone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-globals
            setTimeout((): void => {
                this.favorites = this.favorites.map((item: Favorite): Favorite => {
                    if (favorite.id === item.id) {
                        return { ...favorite, isMarked: !favorite.isMarked };
                    }

                    return item;
                });
                this.cd.detectChanges();
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            }, 100);
        });
    }

    public remove(favorite: Favorite): void {
        this.zone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-globals
            setTimeout((): void => {
                this.favorites = this.favorites.filter((item: Favorite): boolean => item.id !== favorite.id);
                this.cd.detectChanges();
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            }, 100);
        });
    }
}
