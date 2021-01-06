import { NgModule } from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SharedModule} from '../../shared/shared.module';
import { EntryPageComponent } from './pages/entry-page/entry-page.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, EntryPageComponent],
  imports: [
    SharedModule
  ],
  exports: [LoginComponent, RegisterComponent, EntryPageComponent]
})
export class AuthModule { }
