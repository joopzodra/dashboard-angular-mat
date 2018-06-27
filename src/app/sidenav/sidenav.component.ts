import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

/*
 * The SidenavComponent is a child component of the AppComponent.
 * Depending on the screen width, the sidenav is opened or closed. On large screens it's opened. On small and medium screen it's closed and can its opening and closing can be toggled.
 * The toggle method is called in the AppComponent's template (on a toggleEvent, fired by clicking the HeaderComponent's nav button). 
 */

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
