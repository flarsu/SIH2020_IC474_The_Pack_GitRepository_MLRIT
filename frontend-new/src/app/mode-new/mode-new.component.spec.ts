import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeNewComponent } from './mode-new.component';

describe('ModeNewComponent', () => {
  let component: ModeNewComponent;
  let fixture: ComponentFixture<ModeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
