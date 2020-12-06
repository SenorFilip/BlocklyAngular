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
    transition('one => two, two => three', [
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
    transition('three => two, two => one', [
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
