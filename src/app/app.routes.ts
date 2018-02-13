import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { SecureRouteGuard } from './shared/route-guards.ts/secure-route-guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MaterialCodeComponent } from './material-code/material-code/material-code.component';
import { DynamicGridComponent } from './shared/dynamic-grid/dynamic-grid.component';

export const appRoutes: Routes = [
    {
      path: 'task',
      loadChildren: './task/task.module#TaskModule',
      data: { title: 'Hunter Task'},
      canActivate: [ SecureRouteGuard ]
    },
    {
      path: 'home',
      loadChildren: './home/home.module#HomeModule',
      data: { title: 'Hunter Home' },
      canActivate: [ SecureRouteGuard ]
    },
    {
      path: 'admin',
      loadChildren: './admin/admin.module#AdminModule',
      data: { title: 'Hunter Administrator', name: 'Admin' },
      canActivate: [ SecureRouteGuard ]
    },
    {
      path: 'client',
      loadChildren: './client/client.module#ClientModule',
      data: { title: 'Hunter Client', name: 'Client' },
      canActivate: [ SecureRouteGuard ]
    },
    {
      path: 'profiles',
      loadChildren: './user-profile/user-profile.module#UserProfileModule',
      data: { title: 'Hunter User Profiles' },
      canActivate: [ SecureRouteGuard ]
    },
    {
      path: 'material',
      data: { title: 'Material Code Samples' },
      component: MaterialCodeComponent,
      canActivate: [ SecureRouteGuard ]
    },
    {
      path: 'dyn',
      data: { title: 'Dynamic Grid' },
      component: DynamicGridComponent,
      canActivate: [ SecureRouteGuard ]
    },
    {
      path: '**',
      component: PageNotFoundComponent,
      data: { title: 'Page Not Found' }
    }
]

