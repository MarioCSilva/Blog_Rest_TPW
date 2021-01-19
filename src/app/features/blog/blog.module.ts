import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {BlogPageComponent} from "./pages/blog-page/blog-page.component";
import {BlogEditNameModalComponent} from "./components/blog-edit-name-modal/blog-edit-name-modal.component";
import {BlogEditOwnersModalComponent} from "./components/blog-edit-owners-modal/blog-edit-owners-modal.component";
import {BlogEditTopicsModalComponent} from "./components/blog-edit-topics-modal/blog-edit-topics-modal.component";
import {BlogEditInvitesModalComponent} from "./components/blog-edit-invites-modal/blog-edit-invites-modal.component";
import {BlogEditVisibilityModalComponent} from "./components/blog-edit-visibility-modal/blog-edit-visibility-modal.component";
import {BlogSettingsComponent} from "./components/blog-settings/blog-settings.component";
import { BlogEditSubsModalComponent } from './components/blog-edit-subs-modal/blog-edit-subs-modal.component';
import { BlogDeleteModalComponent } from './components/blog-delete-modal/blog-delete-modal.component';

@NgModule({
  declarations: [
    BlogSettingsComponent,
    BlogPageComponent,
    BlogEditNameModalComponent,
    BlogEditOwnersModalComponent,
    BlogEditTopicsModalComponent,
    BlogEditInvitesModalComponent,
    BlogEditVisibilityModalComponent,
    BlogEditSubsModalComponent,
    BlogDeleteModalComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    BlogPageComponent,
  ],
})
export class BlogModule { }
