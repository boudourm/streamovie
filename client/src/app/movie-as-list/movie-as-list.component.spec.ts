import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAsListComponent } from './movie-as-list.component';

describe('MovieAsListComponent', () => {
  let component: MovieAsListComponent;
  let fixture: ComponentFixture<MovieAsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
