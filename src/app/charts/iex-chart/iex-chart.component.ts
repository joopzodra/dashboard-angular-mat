import { Component, ElementRef, Input, ViewChild, HostListener, ViewEncapsulation, OnChanges } from '@angular/core';
import { select, selectAll, Selection, BaseType } from 'd3-selection';
import { max, min } from 'd3-array';
import { scaleTime, scaleLinear } from 'd3-scale';
import { timeParse, timeFormat, timeFormatLocale } from 'd3-time-format';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { formatLocale } from 'd3-format';

import { IexDayItem, IexLongtermItem } from '../../models/iex-items'

/*
 * In order to have the chartContainer width not to be 0, the tab component which contains the IexChartComponent must be lazy loaded. See the documentation for the IexWidgetComponent.
 * In the IexPageComponent, take care that the containing div gets a width of 100%. (If necessairy, continu adding a width of 100% to some parent elements.)
 */

@Component({
  selector: 'jr-iex-chart',
  templateUrl: './iex-chart.component.html',
  styleUrls: ['./iex-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IexChartComponent implements OnChanges {
  @Input() iexItem!: IexDayItem | IexLongtermItem;
  @Input() period!: string;
  @Input('chartHeight') parentElHeight = 200;
  @ViewChild('svg') svg!: ElementRef<SVGElement>
  margin = { top: 8, bottom: 20, left: 45, right: 20 };

  /* D3 locale definitions, formatters and parsers */
  locale = formatLocale({
    decimal: ',',
    thousands: '.',
    grouping: [3],
    currency: ['$ ', ''],
  });
  timeLocale = timeFormatLocale({
    'dateTime': '%A %e %B %Y, %X uur',
    'date': '%d-%m-%Y',
    'time': '%H.%M',
    'periods': ['AM', 'PM'],
    'days': ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
    'shortDays': ['zo', 'ma', 'di', 'woe', 'do', 'vrij', 'za'],
    'months': ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
    'shortMonths': ['jan', 'feb', 'mrt', 'apr', 'mei', 'juni', 'juli', 'aug', 'sept', 'okt', 'nov', 'dec']
  });
  formatPrice = this.locale.format('$');
  formatTimeDayData = timeFormat('%H.%M');
  formatMonthData = this.timeLocale.format('%e %b');
  formatTwoYearsData = this.timeLocale.format('%e %b \'%y')

  parseDateLongtermData = timeParse('%Y-%m-%d'); // The date in an IexLongtermItem has format YYYY-MM-DD.
  parseDateTimeDayData = timeParse('%Y%m%d%H:%M'); // The date in an IexDayItem has format YYYYMMDD.

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
      // First delete previous svg element if any, so chartContainer can adjust its width (by css flex) to the new window size. (This has happened after the setTimeout.) Otherwise the chartContainer' width will determined by the previous svg width and will suddenly change on clicking another tab in the IexWidgetComponent or lead to incorrect sizing in the IexPageComponent. 
      select(this.svg.nativeElement).select('.created-chart').remove();
      setTimeout(() => this.createChart());
    }
  }

  ngOnChanges() {
    select(this.svg.nativeElement).select('.created-chart').remove();
    this.createChart();
  }

  createChart() {
    const svg = select(this.svg.nativeElement);
    const chart = svg.select('.chart')
      .append('g')
      .attr('class', 'created-chart');
    const svgNode = select('svg').node() as SVGElement;
    // In Firefox svgNode.clientWidth and svgNode.clientHeight are 0. Therefore we use getBoundingClientRect().
    const boundingRect = svgNode.getBoundingClientRect();    
    const chartWidth = boundingRect.width - this.margin.left - this.margin.right;
    const chartHeight = boundingRect.height - this.margin.top - this.margin.bottom;

    let chartData;
    // Different data preparation for data from IexDayItem respectively IexLongtermItem. IexLongtermItem doesn't have time property and date property has different format.
    if (this.period === 'day') {
      chartData = (this.iexItem as IexDayItem).day.chart_data
        .filter(item => item.price)
        .map(item => ({ date: this.parseDateTimeDayData(item.date + item.time), price: item.price }));
    } else {
      chartData = this.period === 'month' ? (this.iexItem as IexLongtermItem).month.chart_data : (this.iexItem as IexLongtermItem).twoYears.chart_data;
      chartData = chartData
        .map(item => ({ date: this.parseDateLongtermData(item.date), price: item.price }));
    }

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
      .domain([minPrice - (0.01 * minPrice), Math.ceil(maxPrice + (0.01 * maxPrice))])
      .range([chartHeight, 0]);

    const numberOfTicksX = (width: number) => {
      const maxTicks = 10;
      return width / 40 > maxTicks ? maxTicks : Math.floor(width / 40);
    }
    const numberOfTicksY = (height: number) => {
      return Math.floor(height / 20);
    }

    let xAxisTickFormat;
    switch (this.period) {
      case 'day':
        xAxisTickFormat = this.formatTimeDayData;
        break;
      case 'month':
        xAxisTickFormat = this.formatMonthData;
        break;
      case 'twoYears':
        xAxisTickFormat = this.formatTwoYearsData;
        break;
    }

    const xAxis: any = axisBottom(x)
      .tickFormat(xAxisTickFormat as any)
      .tickSize(4)
      .ticks(numberOfTicksX(chartWidth)) as any;

    const yAxis = axisLeft(y)
      .tickFormat(this.formatPrice)
      .tickSizeOuter(0)
      .tickSizeInner(-chartWidth)
      .ticks(numberOfTicksY(chartHeight)) as any;

    chart.append('g')
      .attr('class', 'iex-chart-x-axis line')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis);

    chart.append('g')
      .attr('class', 'iex-chart-y-axis')
      .call(yAxis);

    const chartLine = line()
      .x(function(d) { return x((<any>d).date); })
      .y(function(d) { return y((<any>d).price); });

    chart.append('path')
      .datum(chartData)
      .attr('class', 'iex-chart-price-line')
      .attr('fill', 'none')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', <any>chartLine);
  }
}
