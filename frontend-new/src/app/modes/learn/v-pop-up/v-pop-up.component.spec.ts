import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VPopUpComponent } from './v-pop-up.component';

describe('VPopUpComponent', () => {
  let component: VPopUpComponent;
  let fixture: ComponentFixture<VPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
