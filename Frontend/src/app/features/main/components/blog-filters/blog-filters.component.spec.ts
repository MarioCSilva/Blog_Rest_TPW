import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFiltersComponent } from './blog-filters.component';

describe('BlogFiltersComponent', () => {
  let component: BlogFiltersComponent;
  let fixture: ComponentFixture<BlogFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
