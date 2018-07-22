import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenweathermapPageComponent } from './openweathermap-page.component';

describe('OpenweathermapPageComponent', () => {
  let component: OpenweathermapPageComponent;
  let fixture: ComponentFixture<OpenweathermapPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenweathermapPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenweathermapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
