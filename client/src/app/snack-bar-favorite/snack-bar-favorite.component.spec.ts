import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarFavoriteComponent } from './snack-bar-favorite.component';

describe('SnackBarFavoriteComponent', () => {
  let component: SnackBarFavoriteComponent;
  let fixture: ComponentFixture<SnackBarFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
