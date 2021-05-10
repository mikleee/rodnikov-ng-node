import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseSearchTriggerComponent } from './showcase-search-trigger.component';

describe('ShowcaseSearchTriggerComponent', () => {
  let component: ShowcaseSearchTriggerComponent;
  let fixture: ComponentFixture<ShowcaseSearchTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcaseSearchTriggerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseSearchTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
