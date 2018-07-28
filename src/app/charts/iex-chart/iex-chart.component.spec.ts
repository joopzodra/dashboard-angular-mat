import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IexChartComponent } from './iex-chart.component';
import { stubIexDayItem } from '../../testing/stub-iex-data';
import { IexDayItem } from '../../models/iex-items'

fdescribe('IexChartComponent', () => {
  let component: IexChartComponent;
  let fixture: ComponentFixture<IexChartComponent>;
  const iexDayItem: IexDayItem = stubIexDayItem;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ IexChartComponent ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IexChartComponent);
    component = fixture.componentInstance;
    (component as any).data = iexDayItem;
    el = fixture.nativeElement;
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
    const axes = el.querySelectorAll('.iex-widget-x-axis, .iex-widget-y-axis');
    expect(axes.length).toBe(2);
    const boundingRectX = axes[0].getBoundingClientRect();
    expect(boundingRectX.width).toBeGreaterThan(200);
    expect(boundingRectX.height).toBeGreaterThan(5);
    const boundingRectY = axes[1].getBoundingClientRect();
    expect(boundingRectY.width).toBeGreaterThan(5);
    expect(boundingRectY.height).toBeGreaterThan(100);
  });

  it('it should contain a line graph', () => {
    const line = el.querySelector('.stock-price-line') as Element;
    expect(line).toBeTruthy();
    const boundingRect = line.getBoundingClientRect();
    expect(boundingRect.width).toBeGreaterThan(200);
    expect(boundingRect.height).toBeGreaterThan(10);    
  });
});
