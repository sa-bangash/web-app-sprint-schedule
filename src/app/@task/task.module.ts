import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//components
import { TaskFormComponent } from './pages/task-form/task-form.component';

//route
import { TaskRoutingModule } from './task.route';
import { TaskViewComponent } from './pages/task-view/task-view.component';

import { NgxsModule } from '@ngxs/store';
import { TaskState } from './store/task.state.model';
import { SearchPipe } from '../pipes/search.pipe';
// material 
import { MaterialModuleModule } from '../@material-module/material.module';
import { SprintFormComponent } from './pages/sprint-form/sprint-form.component';
import { SprintState } from './store/sprint.state.model';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TaskRoutingModule,
    NgxsModule.forFeature([TaskState, SprintState]),
    MaterialModuleModule
  ],
  declarations: [TaskFormComponent, TaskViewComponent, SearchPipe, SprintFormComponent],
  exports: []
})
export class TaskModule { }
