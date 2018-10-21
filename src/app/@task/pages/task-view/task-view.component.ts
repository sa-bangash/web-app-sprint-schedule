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
  taskGroupData: { date: string, task: TaskModel[] }[] = [];
  list: TaskModel[] = [];

  @Select(TaskState.task)
  tasks: Observable<TaskModel[]>;

  constructor(private store: Store) {
    this.store.dispatch(new TaskAction.FetchAll());
    this.tasks.subscribe((list) => {
      console.log(list);
      if (list) {
        this.list = list;
        this.groupByDate();
      }
    })
  }
  groupByDate() {
    this.taskGroupData = [];
    this.list.forEach((item) => {
      const idx = this.indexOf(item.date);
      if (idx > -1) {
        this.taskGroupData[idx].task.push(item)
      } else if (idx === -1) {
        this.taskGroupData.push({
          date: item.date,
          task: [item]
        })
      }
    })
    console.log(this.taskGroupData);
  }

  indexOf(key) {
    return this.taskGroupData.findIndex((item) => {
      return key === item.date;
    })
  }
}
