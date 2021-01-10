import { NgModule } from '@angular/core';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import {SharedModule} from '../../shared/shared.module';
import { MainBlogPageComponent } from './pages/main-blog-page/main-blog-page.component';



@NgModule({
  declarations: [BlogCardComponent, MainBlogPageComponent],
  imports: [
    SharedModule
  ],
  exports: [MainBlogPageComponent]
})
export class MainModule { }
