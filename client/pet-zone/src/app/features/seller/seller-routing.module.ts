import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SellerLayoutComponent } from './seller-layout/seller-layout.component';

const routes: Routes = [
  { path: '', component: SellerLayoutComponent, children: [
    { path: '', component: HomepageComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
