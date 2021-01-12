import { NgModule } from '@angular/core';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import {SharedModule} from '../../shared/shared.module';
import { MainBlogPageComponent } from './pages/main-blog-page/main-blog-page.component';
import { MainPostsPageComponent } from './pages/main-posts-page/main-posts-page.component';
import {AppRoutingModule} from "../../app-routing.module";



@NgModule({
  declarations: [BlogCardComponent, MainBlogPageComponent, MainPostsPageComponent],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [MainBlogPageComponent, MainPostsPageComponent]
})
export class MainModule { }
