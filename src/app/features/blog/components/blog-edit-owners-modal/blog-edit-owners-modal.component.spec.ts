import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditOwnersModalComponent } from './blog-edit-owners-modal.component';

describe('BlogEditOwnersModalComponent', () => {
  let component: BlogEditOwnersModalComponent;
  let fixture: ComponentFixture<BlogEditOwnersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogEditOwnersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditOwnersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
