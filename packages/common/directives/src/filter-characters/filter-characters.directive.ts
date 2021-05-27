import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { filterCharacters } from '@angular-ru/common/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({ selector: '[filterCharacters]' })
export class FilterCharactersDirective implements OnInit, OnDestroy {
    @Input('filterCharacters')
    public characters: string[] = [];

    private control: AbstractControl | undefined;
    private controlChanged$: Subject<boolean> = new Subject();

    @Input()
    public set formControl(control: AbstractControl | undefined) {
        this.control = control;
        this.controlChangeHandler();
    }

    public ngOnInit(): void {
        this.filterCharacters();
    }

    public ngOnDestroy(): void {
        this.controlChanged$.next(true);
        this.controlChanged$.complete();
    }

    private filterCharacters(): void {
        if (typeof this.control?.value !== 'string' || !this.control) {
            return;
        }

        const newValue: string = filterCharacters(this.control?.value, this.characters);
        this.control?.setValue(newValue, { emitEvent: false });
    }

    private controlChangeHandler(): void {
        this.controlChanged$.next(true);
        if (!this.control) {
            return;
        }
        this.filterCharacters();
        this.control?.valueChanges.pipe(takeUntil(this.controlChanged$)).subscribe((): void => {
            this.filterCharacters();
        });
    }
}
