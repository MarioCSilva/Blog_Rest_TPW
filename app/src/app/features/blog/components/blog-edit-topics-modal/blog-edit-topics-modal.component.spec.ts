import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditTopicsModalComponent } from './blog-edit-topics-modal.component';

describe('BlogEditTopicsModalComponent', () => {
  let component: BlogEditTopicsModalComponent;
  let fixture: ComponentFixture<BlogEditTopicsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogEditTopicsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditTopicsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
