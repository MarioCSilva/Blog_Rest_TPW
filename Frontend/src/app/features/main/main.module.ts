import { NgModule } from '@angular/core';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import {SharedModule} from '../../shared/shared.module';
import { MainBlogPageComponent } from './pages/main-blog-page/main-blog-page.component';
import { MainPostsPageComponent } from './pages/main-posts-page/main-posts-page.component';
import {AppRoutingModule} from "../../app-routing.module";
import { MainPageComponent } from './pages/main-page/main-page.component';
import {CreateBlogComponent} from './components/create-blog/create-blog.component';
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [BlogCardComponent, MainBlogPageComponent, MainPostsPageComponent,
    MainPageComponent, CreateBlogComponent],
    imports: [
        SharedModule,
        AppRoutingModule,
        MatCardModule
    ],
  exports: [MainBlogPageComponent, MainPostsPageComponent, CreateBlogComponent]
})
export class MainModule { }
