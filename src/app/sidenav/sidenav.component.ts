import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'jr-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  mode = 'over';
  @Input() 'breakpoints': Observable<boolean[]>
  @ViewChild('sidenav') sidenav!: MatSidenav;

  fillerNav = Array(50).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  ngOnInit() {
    this.breakpoints.subscribe(value => {
      if (value[1]) {
        this.sidenav.open();
        this.mode = 'side';
      } else {
        this.sidenav.close();
        this.mode = 'over';
      }
    })
  }

  toggle() {
    this.sidenav.toggle();
  }
}
