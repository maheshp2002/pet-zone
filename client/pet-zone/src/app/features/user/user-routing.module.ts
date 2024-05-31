import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';

const routes: Routes = [
  { path: '', component: UserLayoutComponent, children: [
    { path: '', component: HomepageComponent },
    { path: 'pet-details/:id', component: PetDetailsComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
