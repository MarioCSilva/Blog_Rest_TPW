import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditInvitesModalComponent } from './blog-edit-invites-modal.component';

describe('BlogEditInvitesModalComponent', () => {
  let component: BlogEditInvitesModalComponent;
  let fixture: ComponentFixture<BlogEditInvitesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogEditInvitesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditInvitesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
