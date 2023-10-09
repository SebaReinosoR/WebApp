import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElementoComponent } from './add-elemento.component';

describe('AddElementoComponent', () => {
  let component: AddElementoComponent;
  let fixture: ComponentFixture<AddElementoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddElementoComponent]
    });
    fixture = TestBed.createComponent(AddElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
