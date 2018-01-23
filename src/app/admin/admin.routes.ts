import { AdminComponent } from './admin.component';
import { Routes } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
export const adminRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'admin',
          component: AdminComponent
        }
      ]
    }
]
