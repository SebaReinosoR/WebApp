import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyElementoComponent } from './modify-elemento.component';

describe('ModifyElementoComponent', () => {
  let component: ModifyElementoComponent;
  let fixture: ComponentFixture<ModifyElementoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyElementoComponent]
    });
    fixture = TestBed.createComponent(ModifyElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
