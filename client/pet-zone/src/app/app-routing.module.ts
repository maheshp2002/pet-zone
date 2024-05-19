import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { UserGuard } from './core/utilities/guards/user.guard';
import { AdminGuard } from './core/utilities/guards/admin.guard';

const routes: Routes = [
  {
    path: '',    
    loadChildren: () => import('./features/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: 'user',    
    // canActivate: [UserGuard],
    loadChildren: () => import('./features/user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'admin',  
    // canActivate: [AdminGuard],  
    loadChildren: () => import('./features/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
