import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { LoginComponent, SignupComponent, DashboardComponent } from './components';
const router: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    }
]


export const routes: ModuleWithProviders = RouterModule.forRoot(router);