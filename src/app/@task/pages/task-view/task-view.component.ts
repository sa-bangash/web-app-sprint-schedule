import { Component, OnInit } from '@angular/core';
import { TaskAction } from '../../store';
import { Store, Select } from '@ngxs/store';
import { TaskState, TaskModel } from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent {

  @Select(TaskState.task)
  tasks: Observable<TaskModel>;
  constructor(private store: Store) {
    this.store.dispatch(new TaskAction.FetchAll());
  }

}
