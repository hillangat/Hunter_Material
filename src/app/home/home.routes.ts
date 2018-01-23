import { Routes } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
export const homeRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'home',
          component: HomeComponent
        }
      ]
    }
]
