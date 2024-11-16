import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: "profile",
  loadComponent: () => import("./profile/profile.component").then(t => t.ProfileComponent)
},
{
  path: "change-password",
  loadComponent: () => import("./change-password/change-password.component").then(t => t.ChangePasswordComponent)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
