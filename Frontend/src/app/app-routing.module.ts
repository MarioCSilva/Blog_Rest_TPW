import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';
import {PostComponent} from './shared/components/post/post.component';
import {EntryPageComponent} from './features/auth/pages/entry-page/entry-page.component';

const routes: Routes = [
  {path: 'login', component: EntryPageComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'post', component: PostComponent}
];

@NgModule({
  declarations: [],

  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
