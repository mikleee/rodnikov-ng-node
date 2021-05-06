import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseSortComponent } from './showcase-sort.component';

describe('ShowcaseSortComponent', () => {
  let component: ShowcaseSortComponent;
  let fixture: ComponentFixture<ShowcaseSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcaseSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
