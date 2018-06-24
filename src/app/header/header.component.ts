import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'jr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {  
  monthDict = ['januari', 'februari','maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
  date = new Date()
  day = this.date.getDate();
  month = this.monthDict[this.date.getMonth()];
  year = this.date.getFullYear();

  mediaMedium = false; 
  mediaLarge = false; 
  @Input() 'breakpoints': Observable<boolean[]>
  @Output() toggleEvent: EventEmitter<boolean>;

  constructor() {
    this.toggleEvent = new EventEmitter()
  }

  ngOnInit() {
    this.breakpoints.subscribe(value => {
      this.mediaMedium = value[0];
      this.mediaLarge = value[1];
    })
  }

  toggleSidenav() {
    this.toggleEvent.emit(true);
  }
}
