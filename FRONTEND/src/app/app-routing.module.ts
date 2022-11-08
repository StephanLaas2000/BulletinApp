import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostDisplayComponent } from './post/post-display/post-display.component';
import { NavigationComponent } from './Navigation/navigation/navigation.component';

const routes: Routes = [
  { path: 'viewPosts', component: PostDisplayComponent },
  { path: 'nav', component: NavigationComponent },

  { path: 'add', component: PostCreateComponent },
  { path: 'signup', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
