import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

/*
 * The DashboardComponent is the host of several widget components. In the navigation it is called Overview.
 * On clicking a widget, it navigates to the corresponding page.
 */

@Component({
  selector: 'jr-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    const title = this.activatedRoute.snapshot.data['title'];
    if (title) {
      this.titleService.setTitle(title);
    }
  }

}
