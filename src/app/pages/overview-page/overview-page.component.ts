import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
export class OverviewPageComponent implements OnInit, AfterViewInit {

  @ViewChild('pageContent') pageContent!: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    const title = this.activatedRoute.snapshot.data['title'];
    if (title) {
      this.titleService.setTitle(title);
    }
  }

// Currently unnecessary since routerlink with fragment doesn't scroll to anchor. However, this will be changed in router v6.1. See https://medium.com/lacolaco-blog/introduce-router-scroller-in-angular-v6-1-ef34278461e9.
  ngAfterViewInit() {
    (<HTMLElement>this.pageContent.nativeElement).addEventListener('focus', () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }

}
