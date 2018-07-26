import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IexPageComponent } from './iex-page.component';

describe('IexPageComponent', () => {
  let component: IexPageComponent;
  let fixture: ComponentFixture<IexPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IexPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
