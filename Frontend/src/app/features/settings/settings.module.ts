import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ProfileComponent} from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';




@NgModule({
  declarations: [ProfileComponent, EditProfileComponent, ProfilePageComponent],
    imports: [
        SharedModule,
    ]
})
export class SettingsModule { }
