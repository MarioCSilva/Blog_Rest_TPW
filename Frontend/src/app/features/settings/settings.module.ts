import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ProfileComponent} from './components/profile/profile.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SettingsCardComponent } from './components/settings-card/settings-card.component';




@NgModule({
  declarations: [ProfileComponent, ProfilePageComponent, SettingsCardComponent],
    imports: [
        SharedModule,
    ]
})
export class SettingsModule { }
