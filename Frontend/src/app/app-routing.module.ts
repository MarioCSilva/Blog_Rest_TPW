import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './features/auth/components/login/login.component';
import {RegisterComponent} from './features/auth/components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {PostComponent} from './components/post/post.component';
import {BlogPageComponent} from './features/blog/pages/blog-page/blog-page.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'post', component: PostComponent},
  {path: 'blog/:num', component: BlogPageComponent},
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
