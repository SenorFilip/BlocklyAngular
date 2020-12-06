import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {routeNextLessonTransitionAnimations, routeNextPageTransitionAnimations} from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeNextPageTransitionAnimations,
    routeNextLessonTransitionAnimations
  ]
})
export class AppComponent {
  title = 'BlocklyAngular';

  prepareNextPageRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData.animationState;
  }

  prepareNextLessonRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData.lessonAnimationState;
  }
}
