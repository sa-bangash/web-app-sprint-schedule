import { Component, OnInit } from '@angular/core';
import { TaskAction, UserModel, SprintState, SprintModel, IStatus } from '../../store';
import { Store, Select } from '@ngxs/store';
import { TaskState, TaskModel, SprintAction } from '../../store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  resourceSearch = '';
  groupData: IGroupData[] = []
  list: TaskModel[] = [];
  userList: string[] = [];
  @Select(TaskState.task)
  tasks: Observable<TaskModel[]>;

  @Select(TaskState.statusList)
  statusList$: Observable<IStatus[]>

  constructor(private store: Store) {
  
    this.store.dispatch(new TaskAction.FetchAll());
    this.store.dispatch(new TaskAction.FetchStatus());
    this.tasks.subscribe((list) => {
      if (list) {
        this.list = list;
        this.groupByUser()
        this.populateUserList();
      }
    })
  }

  populateUserList() {
    this.userList = this.groupData.map((item) => {
      return item.name;
    })
  }

  groupByUser() {
    this.groupData = []
    this.list.forEach((item) => {
      const nameIdx = this.indexOfName(item.user.name);
      if (nameIdx > -1) {
        if (this.groupData[nameIdx].task[item.getWeekOfDay]) {
          this.groupData[nameIdx].task[item.getWeekOfDay].push(item)
        } else {
          this.groupData[nameIdx].task[item.getWeekOfDay] = [item];
        }
      } else if (nameIdx === -1) {
        this.groupData.push({
          name: item.user.name,
          task: {
            [item.getWeekOfDay]: [item],
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
