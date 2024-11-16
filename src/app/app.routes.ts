import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: "signin",
    loadComponent: () => import('./auth/sign-in/sign-in.component').then(t => t.SignInComponent)
}, {
    path: "register",
    loadComponent: () => import('./auth/sign-in/sign-in.component').then(t => t.SignInComponent)
}, {
    path: "signin",
    loadComponent: () => import('./auth/sign-in/sign-in.component').then(t => t.SignInComponent)
},{
    path: "",
    loadChildren: () => import('./layout/outer/outer.module').then(t => t.OuterModule)
}];
