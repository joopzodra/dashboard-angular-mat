import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

/*
 * The DashboardComponent is the host of several widget components.
 * On clicking a widget, it navigates to the corresponding page.
 */

@Component({
  selector: 'jr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router){}

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
