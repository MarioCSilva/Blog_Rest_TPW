import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {BlogPageComponent} from "./pages/blog-page/blog-page.component";
import {BlogEditNameModalComponent} from "./components/blog-edit-name-modal/blog-edit-name-modal.component";
import {BlogEditOwnersModalComponent} from "./components/blog-edit-owners-modal/blog-edit-owners-modal.component";
import {BlogEditTopicsModalComponent} from "./components/blog-edit-topics-modal/blog-edit-topics-modal.component";
import {BlogEditInvitesModalComponent} from "./components/blog-edit-invites-modal/blog-edit-invites-modal.component";
import {BlogEditVisibilityModalComponent} from "./components/blog-edit-visibility-modal/blog-edit-visibility-modal.component";
import {BlogSettingsComponent} from "./components/blog-settings/blog-settings.component";

@NgModule({
  declarations: [
    BlogSettingsComponent,
    BlogPageComponent,
    BlogEditNameModalComponent,
    BlogEditOwnersModalComponent,
    BlogEditTopicsModalComponent,
    BlogEditInvitesModalComponent,
    BlogEditVisibilityModalComponent,
  ],
    imports: [
        SharedModule,
    ],
  exports: [
    BlogPageComponent,
    BlogEditNameModalComponent,
    BlogEditOwnersModalComponent,
    BlogEditTopicsModalComponent,
    BlogEditInvitesModalComponent,
    BlogEditVisibilityModalComponent,
    BlogPageComponent,
  ],
})
export class BlogModule { }
