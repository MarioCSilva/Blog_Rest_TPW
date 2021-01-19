import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPostsPageComponent } from './main-posts-page.component';

describe('MainPostsPageComponent', () => {
  let component: MainPostsPageComponent;
  let fixture: ComponentFixture<MainPostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPostsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
