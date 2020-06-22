import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistLineComponent } from './playlist-line.component';

describe('PlaylistLineComponent', () => {
  let component: PlaylistLineComponent;
  let fixture: ComponentFixture<PlaylistLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
