import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNewComponent } from './login-new.component';

describe('LoginNewComponent', () => {
  let component: LoginNewComponent;
  let fixture: ComponentFixture<LoginNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
