import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

const DEFAULT_TIME_ANIMATION: number = 150;

export const NGX_ANIMATION: AnimationTriggerMetadata = trigger('fadeAnimation', [
    state('in', style({ opacity: 1 })),
    transition(':enter', [style({ opacity: 0 }), animate(DEFAULT_TIME_ANIMATION)]),
    transition(':leave', animate(0, style({ opacity: 0 })))
]);
