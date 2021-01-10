import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [BlogCardComponent, MainPageComponent],
  imports: [
    SharedModule
  ],
  exports:[MainPageComponent]
})
export class MainModule { }
