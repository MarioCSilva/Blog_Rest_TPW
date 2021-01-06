import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './features/auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [SharedModule, AppRoutingModule, AuthModule, ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
