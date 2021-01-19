import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditSubsModalComponent } from './blog-edit-subs-modal.component';

describe('BlogEditSubsModalComponent', () => {
  let component: BlogEditSubsModalComponent;
  let fixture: ComponentFixture<BlogEditSubsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogEditSubsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditSubsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
