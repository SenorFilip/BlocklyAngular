import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  animate,
  group
} from '@angular/animations';

export const routeNextPageTransitionAnimations =
  trigger('routeNextPageAnimations', [
    // animations for moving to the next screen in a lesson
    transition(
      `1 => 2, 2 => 3, 3 => 4,
       11 => 12, 12 => 13,
       21 => 22, 22 => 23,
       31 => 32, 32 => 33,
       41 => 42, 42 => 43,
       51 => 52, 52 => 53,
       61 => 62, 62 => 63, 63 => 64,
       71 => 72, 72 => 73`, [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({
          right: '-100%',
          opacity: 0
        })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out',
            style({
              right: '100%',
              opacity: 0
            })
          )
        ]),
        query(':enter', [
          animate('500ms ease-out',
            style({
              right: '0%',
              opacity: 1
            }))
        ])
      ])
    ]),
    // animations for going back to the screen before in a lesson
    transition(
      `4 => 3, 3 => 2, 2 => 1,
       13 => 12, 12 => 11,
       23 => 22, 22 => 21,
       33 => 32, 32 => 31,
       43 => 42, 42 => 41,
       53 => 52, 52 => 51,
       64 => 63, 63 => 62, 62 => 61,
       73 => 72, 72 => 71`, [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({
          left: '-100%',
          opacity: 0
        })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out',
            style({
              left: '100%',
              opacity: 0
            })
          )
        ]),
        query(':enter', [
          animate('500ms ease-out',
            style({
              left: '0%',
              opacity: 1
            }))
        ])
      ])
    ])
  ]);

export const routeNextLessonTransitionAnimations =
  trigger('routeNextLessonAnimations', [
    transition('* <=> *', [
      // css styles at start of transition
      style({ opacity: 0 }),
      // animation and styles at end of transition
      animate('.5s', style({ opacity: 1 }))
    ]),
  ]);
