import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { DisplayBlogComponent } from './display-blog/display-blog.component';
import { HomeBlogComponent } from './home-blog/home-blog.component';

const routes: Routes = [
  { path: 'home', component: HomeBlogComponent },
  { path: 'add', component: AddBlogComponent },
  { path: 'display/:id', component: DisplayBlogComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
