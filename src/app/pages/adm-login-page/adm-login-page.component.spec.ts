import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmLoginPageComponent } from './adm-login-page.component';

describe('AdmLoginPageComponent', () => {
  let component: AdmLoginPageComponent;
  let fixture: ComponentFixture<AdmLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmLoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
