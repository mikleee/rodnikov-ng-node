import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseProductCategoriesComponent } from './showcase-product-categories.component';

describe('ShowcaseProductCategoriesComponent', () => {
  let component: ShowcaseProductCategoriesComponent;
  let fixture: ComponentFixture<ShowcaseProductCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcaseProductCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseProductCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
