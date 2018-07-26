import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

import { IexService } from '../../../services/iex-service/iex.service';
import { IexDayItem } from '../../../models/iex-items';

@Component({
  selector: 'jr-iex-widget',
  templateUrl: './iex-widget.component.html',
  styleUrls: ['./iex-widget.component.scss']
})
export class IexWidgetComponent implements OnInit {

  companyData: Observable<IexDayItem[]> = of([]);

  constructor(private service: IexService) { }

  ngOnInit() {
    this.companyData = this.service.getWidgetData().pipe(tap(x => console.log(x)));
  }

}
