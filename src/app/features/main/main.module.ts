import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { MainBlogPageComponent } from './pages/main-blog-page/main-blog-page.component';
import { MainPostsPageComponent } from './pages/main-posts-page/main-posts-page.component';
import {AppRoutingModule} from '../../app-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {CreateBlogComponent} from './components/create-blog/create-blog.component';
import { PostFiltersComponent } from './components/post-filters/post-filters.component';
import { BlogFiltersComponent } from './components/blog-filters/blog-filters.component';


@NgModule({
  declarations: [MainBlogPageComponent, MainPostsPageComponent,
    MainPageComponent, CreateBlogComponent, PostFiltersComponent, BlogFiltersComponent],
    imports: [
        SharedModule,
        AppRoutingModule,
    ],
  exports: [MainBlogPageComponent, MainPostsPageComponent, CreateBlogComponent]
})
export class MainModule { }
