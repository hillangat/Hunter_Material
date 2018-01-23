import { UserProfileComponent } from './user-profile.component';
import { Routes } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
export const userProfileRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'profiles',
          component: UserProfileComponent
        }
      ]
    }
]
