import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './features/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {HeaderInterceptor} from "./core/interceptor/HeaderInterceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [SharedModule, AppRoutingModule, AuthModule, ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
