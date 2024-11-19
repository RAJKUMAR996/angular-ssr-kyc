import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: "signin",
    loadComponent: () => import('./auth/sign-in/sign-in.component').then(t => t.SignInComponent)
}, {
    path: "register",
    loadComponent: () => import('./auth/sign-up/sign-up.component').then(t => t.SignUpComponent)
}, {
    path: "forgotpassword",
    loadComponent: () => import('./auth/forgot-password/forgot-password.component').then(t => t.ForgotPasswordComponent)
}, {
    path: "admin",
    loadChildren: () => import('../admin/admin.module').then(t => t.AdminModule)
}, {
    path: "",
    loadChildren: () => import('./layout/outer/outer.module').then(t => t.OuterModule)
}, {
    path: "**",
    redirectTo: ""
}];
