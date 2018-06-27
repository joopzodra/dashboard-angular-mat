import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

/*
 * The DashboardComponent is the host of several widget components.
 */

@Component({
  selector: 'jr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cols = 1;
  @Input() 'breakpoints': Observable<boolean[]>

  constructor() { }

  ngOnInit() {
    this.breakpoints.subscribe(value => {
      if (value[1]) {
        this.cols = 3;
      } else if (value[0]) {
        this.cols = 2;
      } else {
        this.cols =1;
      }
    })
  }
}
