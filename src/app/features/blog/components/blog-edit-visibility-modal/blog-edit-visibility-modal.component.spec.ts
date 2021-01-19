import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditVisibilityModalComponent } from './blog-edit-visibility-modal.component';

describe('BlogEditVisibilityModalComponent', () => {
  let component: BlogEditVisibilityModalComponent;
  let fixture: ComponentFixture<BlogEditVisibilityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogEditVisibilityModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditVisibilityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
