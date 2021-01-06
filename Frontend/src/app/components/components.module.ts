import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ProfileComponent} from './profile/profile.component';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedModule
  ]
})
export class ComponentsModule { }
