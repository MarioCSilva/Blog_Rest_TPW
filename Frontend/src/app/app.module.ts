import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './features/auth/auth.module';
import {SettingsModule} from './features/settings/settings.module';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {HeaderInterceptor} from "./core/interceptor/HeaderInterceptor";
import {BlogModule} from "./features/blog/blog.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BlogModule, SharedModule, AppRoutingModule, AuthModule, SettingsModule, MatNativeDateModule],
  providers: [
    UserService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    }
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
