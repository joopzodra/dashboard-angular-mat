import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { IexChartComponent } from './iex-chart.component';
import { stubIexDayItem } from '../../testing/stub-iex-data';
import { IexDayItem } from '../../models/iex-items'

describe('IexChartComponent', () => {
  let component: IexChartComponent;
  let fixture: ComponentFixture<IexChartComponent>;
  const iexDayItem: IexDayItem = stubIexDayItem;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IexChartComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IexChartComponent);
    component = fixture.componentInstance;
    (component as any).iexItem = iexDayItem;
    (component as any).period = 'day';
    el = fixture.nativeElement;
    // We need to call ngOnChanges, since we manually changed a property of the IexChartComponent. This means that when we call detectChanges Angular will not detect any changes and not call ngOnChanges.
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an svg element', () => {
    const svg = el.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('it should contain an x and and y axis.', () => {
    const axes = el.querySelectorAll('.iex-chart-x-axis, .iex-chart-y-axis');
    expect(axes.length).toBe(2);
    const boundingRectX = axes[0].getBoundingClientRect();
    expect(boundingRectX.width).toBeGreaterThan(200);
    expect(boundingRectX.height).toBeGreaterThan(5);
    const boundingRectY = axes[1].getBoundingClientRect();
    expect(boundingRectY.width).toBeGreaterThan(5);
    expect(boundingRectY.height).toBeGreaterThan(100);

  });

  it('it should contain a line graph', () => {
    const line = el.querySelector('.iex-chart-price-line') as Element;
    expect(line).toBeTruthy();
    const boundingRect = line.getBoundingClientRect();
    expect(boundingRect.width).toBeGreaterThan(200);
    expect(boundingRect.height).toBeGreaterThan(10);
  });
});
