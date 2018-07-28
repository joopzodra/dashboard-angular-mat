import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IexChartComponent } from './iex-chart/iex-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IexChartComponent],
  exports: [IexChartComponent]
})
export class ChartsModule { }
