import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditNameModalComponent } from './blog-edit-name-modal.component';

describe('BlogEditNameModalComponent', () => {
  let component: BlogEditNameModalComponent;
  let fixture: ComponentFixture<BlogEditNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogEditNameModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
