import { Component } from '@angular/core';
import { TaskAction } from '../../store';
import { Store, Select } from '@ngxs/store';
import { TaskState, TaskModel } from '../../store/task/task.state.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Select(TaskState.task)
  tasks: Observable<TaskModel>;
  constructor(private store: Store) {
    this.store.dispatch(new TaskAction.FetchAll());
  }

}
