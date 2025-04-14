import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  activeRoute: string = '';

  constructor(private router: Router) {
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event) => {
      const navEndEvent = event as NavigationEnd;
      this.activeRoute = navEndEvent.urlAfterRedirects;
    });
  
  }

  isActive(path: string): boolean {
    return this.activeRoute.includes(path);
  }

}
