import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarPanierComponent } from './snack-bar-panier.component';

describe('SnackBarPanierComponent', () => {
  let component: SnackBarPanierComponent;
  let fixture: ComponentFixture<SnackBarPanierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarPanierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
