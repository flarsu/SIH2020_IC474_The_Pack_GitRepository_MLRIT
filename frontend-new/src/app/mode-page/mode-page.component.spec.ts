import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModePageComponent } from './mode-page.component';

describe('ModePageComponent', () => {
  let component: ModePageComponent;
  let fixture: ComponentFixture<ModePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
