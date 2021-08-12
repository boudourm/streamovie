import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierOverComponent } from './panier-over.component';

describe('PanierOverComponent', () => {
  let component: PanierOverComponent;
  let fixture: ComponentFixture<PanierOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanierOverComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
