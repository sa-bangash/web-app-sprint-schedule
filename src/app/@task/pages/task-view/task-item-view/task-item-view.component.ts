import { Component, OnInit, Input } from '@angular/core';
import { TaskModel, TaskAction, IStatus } from 'src/app/@task/store';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-task-item-view',
  templateUrl: './task-item-view.component.html',
  styleUrls: ['./task-item-view.component.css']
})
export class TaskItemViewComponent implements OnInit {
  _task: TaskModel;

  @Input()
  set task(value: TaskModel) {
    if (value) {
      this._task = value;

      this.selectedStatus.setValue(this._task.status);
    }
  }

  get task(): TaskModel {
    return this._task
  }

  @Input()
  idx: number;

  @Input()
  statusList = [];
  selectedStatus = new FormControl();
  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit() {
    this.selectedStatus.valueChanges.subscribe((value:IStatus) => {
      this.store.dispatch(new TaskAction.UpdateTaskStatus(
        {
          ...this._task,
          status: value,
        }
      ))
    })
  }

  delete(task: TaskModel) {
    this.store.dispatch(new TaskAction.Delete(task._id));
  }
  compState(valueA: IStatus, valueB: IStatus) {
    return valueA.id === valueB.id;
  }
}
