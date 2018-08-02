import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

/*
 * The DashboardComponent is the host of several widget components. In the navigation it is called Overview.
 * On clicking a widget, it navigates to the corresponding page.
 */

@Component({
  selector: 'jr-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent {

  constructor(private router: Router){}

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
