import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {BlogPageComponent} from "./pages/blog-page/blog-page.component";


@NgModule({
  declarations: [BlogPageComponent],
    imports: [
        SharedModule,
    ],
    exports: [
      BlogPageComponent
    ],
})
export class BlogModule { }
