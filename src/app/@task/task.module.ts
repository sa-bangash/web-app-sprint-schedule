import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//components
import { TaskFormComponent } from './pages/task-form/task-form.component';

//route
import { TaskRoutingModule } from './task.route';
import { TaskViewComponent } from './pages/task-view/task-view.component';

import { NgxsModule } from '@ngxs/store';
import { TaskState } from './store/task.state.model';

// material 
import { MaterialModuleModule } from '../@material-module/material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TaskRoutingModule,
    NgxsModule.forFeature([TaskState]),
    MaterialModuleModule
  ],
  declarations: [TaskFormComponent, TaskViewComponent],
  exports: []
})
export class TaskModule { }