import {
    animate,
    AnimationTriggerMetadata,
    keyframes,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

export const fadeInLinearAnimation: AnimationTriggerMetadata = trigger('fadeInLinear', [
    state('in', style({transform: 'translateX(0)'})),
    transition(
        'void => *',
        animate(
            '500ms linear',
            keyframes([style({opacity: 0, offset: 0}), style({opacity: 1, offset: 1.0})]),
        ),
    ),
]);
