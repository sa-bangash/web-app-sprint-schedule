import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components 
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';

export const routes: Routes = [
    {
        path: '',
        component: TaskViewComponent,
    },
    {
        path: 'form',
        component: TaskFormComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }
