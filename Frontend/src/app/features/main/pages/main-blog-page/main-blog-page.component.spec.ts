import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBlogPageComponent } from './main-blog-page.component';

describe('MainBlogPageComponent', () => {
  let component: MainBlogPageComponent;
  let fixture: ComponentFixture<MainBlogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBlogPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
