import { Routes } from '@angular/router';
import { OuterComponent } from './outer.component';

export const routes: Routes = [{
    path: "",
    component: OuterComponent,
    children: [
        {
            path: '',
            loadComponent: () => import('../../static/landing/landing.component').then(t => t.LandingComponent)
        }
    ]
}];

