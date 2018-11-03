import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { LoginComponent, SignupComponent, DashboardComponent } from './components';

// guards
import { LoginGuard, AuthGuard } from './guards';

// constent 
import { ESignupStatus } from './app.constant';
const router: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard],
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'create-work-space',
        component: SignupComponent,
        data: {
            space: ESignupStatus.workSpaceSignUp,
        },
    },
    {
        path: 'dashboard',
        // component: DashboardComponent,
        loadChildren: './@task/task.module#TaskModule',
        canActivate: [AuthGuard],
    },

]


export const routes: ModuleWithProviders = RouterModule.forRoot(router);