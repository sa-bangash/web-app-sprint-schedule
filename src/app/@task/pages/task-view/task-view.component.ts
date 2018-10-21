import { Component, OnInit } from '@angular/core';
import { TaskAction } from '../../store';
import { Store, Select } from '@ngxs/store';
import { TaskState, TaskModel } from '../../store';
import { Observable } from 'rxjs';

interface IGroupData {
  name: string;
  task: {
    [key: string]: TaskModel[];
  }
}
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent {
  groupData: IGroupData[] = []
  list: TaskModel[] = [];

  @Select(TaskState.task)
  tasks: Observable<TaskModel[]>;

  constructor(private store: Store) {
    this.store.dispatch(new TaskAction.FetchMy());
    this.tasks.subscribe((list) => {
      if (list) {
        this.list = list;
        this.groupByUser()
      }
    })
  }
  groupByUser() {
    this.groupData = []
    this.list.forEach((item) => {
      const nameIdx = this.indexOfName(item.user.name);
      if (nameIdx > -1) {
        if (this.groupData[nameIdx].task[item.date]) {
          this.groupData[nameIdx].task[item.date].push(item)
        } else {
          this.groupData[nameIdx].task[item.date] = [item];
        }
      } else if (nameIdx === -1) {
        this.groupData.push({
          name: item.user.name,
          task: {
            [item.date]: [item],
          }
        })
      }
    })
  }
  
  indexOfName(name) {
    return this.groupData.findIndex((item) => {
      return item.name === name
    })
  }
}
