import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './features/auth/auth.module';
import {SettingsModule} from './features/settings/settings.module';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [AppComponent],
  imports: [SharedModule, AppRoutingModule, AuthModule, SettingsModule, MatNativeDateModule],
  providers: [
    UserService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
