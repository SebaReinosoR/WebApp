import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliVComponent } from './publi.v.component';

describe('PubliVComponent', () => {
  let component: PubliVComponent;
  let fixture: ComponentFixture<PubliVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PubliVComponent]
    });
    fixture = TestBed.createComponent(PubliVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
