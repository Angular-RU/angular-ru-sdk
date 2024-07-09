import {
    animate,
    AnimationTriggerMetadata,
    style,
    transition,
    trigger,
} from '@angular/animations';

export const fadeInBezierAnimation: AnimationTriggerMetadata = trigger('fadeInBezier', [
    transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),
        animate(
            '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
            style({transform: 'scale(1)', opacity: 1}),
        ),
    ]),
]);
