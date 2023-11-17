import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtemaUDComponent } from './subtema-ud.component';

describe('SubtemaUDComponent', () => {
  let component: SubtemaUDComponent;
  let fixture: ComponentFixture<SubtemaUDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubtemaUDComponent]
    });
    fixture = TestBed.createComponent(SubtemaUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
