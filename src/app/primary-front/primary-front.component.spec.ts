import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryFrontComponent } from './primary-front.component';

describe('PrimaryFrontComponent', () => {
  let component: PrimaryFrontComponent;
  let fixture: ComponentFixture<PrimaryFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimaryFrontComponent]
    });
    fixture = TestBed.createComponent(PrimaryFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
