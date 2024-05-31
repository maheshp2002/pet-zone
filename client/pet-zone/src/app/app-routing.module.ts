import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { UserGuard } from './core/utilities/guards/user.guard';
import { AdminGuard } from './core/utilities/guards/admin.guard';
import { SellerGuard } from './core/utilities/guards/seller.guard';

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
    path: 'chats',  
    // canActivate: [UserGuard, SellerGuard],  
    loadChildren: () => import('./features/chats/chats.module').then((m) => m.ChatsModule)
  },
  {
    path: 'admin',  
    // canActivate: [AdminGuard],  
    loadChildren: () => import('./features/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'seller',  
    // canActivate: [SellerGuard],  
    loadChildren: () => import('./features/seller/seller.module').then((m) => m.SellerModule)
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
