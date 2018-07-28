import { Component, OnInit, ElementRef, Input, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { select, selectAll, Selection, BaseType } from 'd3-selection';
import { max, min } from 'd3-array';
import { scaleTime, scaleLinear } from 'd3-scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { formatLocale } from 'd3-format';

import { IexDayItem } from '../../models/iex-items'

/*
 * In order to have the chartContainer width not to be 0, the tab component which contains the IexChartComponent must be lazy loaded. See the documentation for the IexWidgetComponent.
 */

@Component({
  selector: 'jr-iex-chart',
  templateUrl: './iex-chart.component.html',
  styleUrls: ['./iex-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IexChartComponent implements OnInit {
  @Input() private data!: IexDayItem;
  @ViewChild('chartContainer') private chartContainer!: ElementRef<HTMLElement>;
  private margin = { top: 20, bottom: 20, left: 45, right: 20 };
  private chart!: Selection<BaseType, {}, null, undefined>;
  private parentElHeight = 200;

  /* D3 settings */
  private locale = formatLocale({
    decimal: ',',
    thousands: '.',
    grouping: [3],
    currency: ['$ ', '']
  });
  private formatPrice = this.locale.format('$');
  private formatTime = timeFormat('%H.%M');

  /* Adjust chart width on window resize */
  resizeTimeout: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!this.resizeTimeout) {
      this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = undefined;
        actualResizeHandler();
        // The actualResizeHandler will execute at a rate of 3fps
      }, 333);
    }
    const actualResizeHandler = () => {
      // First delete previous svg element if any, so chartContainer can adjust its width (by css flex) to the new window size. Otherwise the chartContainer' width will determined by the previous svg width and will suddenly change on clicking another tab in the IexWidgetComponent. 
      select(this.chartContainer.nativeElement).select('svg').remove();
      this.createChart();
    }
  }

  constructor() {
  }

  ngOnInit() {
    this.createChart()
  }

  createChart() {
    const parentEl = this.chartContainer.nativeElement;
    const parentElWidth = (<HTMLElement>this.chartContainer.nativeElement).offsetWidth;
    // Set maximum value for svg width
    const svgWidth = Math.min(parentElWidth, 700);
    const chartWidth = svgWidth - this.margin.left - this.margin.right;
    const chartHeight = this.parentElHeight - this.margin.top - this.margin.bottom;
    const svg = select(parentEl).append('svg')
      .attr('width', svgWidth)
      .attr('height', this.parentElHeight);

    this.chart = svg.append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const parseTime = timeParse("%Y%m%d%H:%M");

    const chartData = this.data.day.chart_data
      .filter(item => item.price)
      .map(item => ({ date: parseTime(item.date + item.time), price: item.price }));

    const xStart = chartData[0].date as Date;
    const xEnd = chartData[chartData.length - 1].date as Date;
    // A full day in the IEX data end at 15.59h. To obtain a proper end tick at the axis, we want the end time to be 16.00 so we add one minute.
    xEnd.setTime(xEnd.getTime() + 1000 * 60);
    const x = scaleTime()
      .domain([xStart, xEnd])
      .range([0, chartWidth]);

    const maxPrice = max(chartData, d => d.price) as number;
    const minPrice = min(chartData, d => d.price) as number;
    const y = scaleLinear()
      .domain([minPrice - (0.01 * minPrice), Math.floor(maxPrice + (0.01 * maxPrice))])
      .range([chartHeight, 0]);

    const numberOfTicks = (width: number) => { 
      const maxTicks = 10;
      return width / 40 > maxTicks ? maxTicks : Math.floor(width / 40);
    }  
    const xAxis: any = axisBottom(x)
      .tickFormat(this.formatTime as any)
      .tickSize(4)
      .ticks(numberOfTicks(chartWidth)) as any;

    const yAxis = axisLeft(y)
      .tickFormat(this.formatPrice)
      .tickSizeOuter(0)
      .tickSizeInner(-chartWidth)
      .ticks(7) as any;

    this.chart.append('g')
      .attr('class', 'iex-widget-x-axis line')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis);

    this.chart.append('g')
      .attr('class', 'iex-widget-y-axis')
      .call(yAxis);
      
    const chartLine = line()
      .x(function(d) { return x((<any>d).date); })
      .y(function(d) { return y((<any>d).price); });

    this.chart.append("path")
      .datum(chartData)
      .attr('class', 'stock-price-line')
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", <any>chartLine);
  }
}
