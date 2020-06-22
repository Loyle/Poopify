import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogscreenComponent } from './logscreen.component';

describe('LogscreenComponent', () => {
  let component: LogscreenComponent;
  let fixture: ComponentFixture<LogscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
