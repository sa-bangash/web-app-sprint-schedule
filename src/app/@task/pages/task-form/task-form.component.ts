import { Component, OnInit } from '@angular/core';
import { Store, ofActionSuccessful, Actions, Select } from '@ngxs/store';
import { TaskAction, TaskState, TaskModel } from '../../store/task.state.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Select(TaskState.taskError)
  error: Observable<TaskModel>;
  form: FormGroup;
  constructor(
    private store: Store,
    private _fb: FormBuilder,
    private action$: Actions,
  ) {
    this.form = this._fb.group({
      description: [],
      estimatedTime: [],
      storyNumber: [],
      date: [],
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.action$.pipe(ofActionSuccessful(TaskAction.Add)).subscribe(() => {
      this.form.reset();
    })
    this.store.dispatch(new TaskAction.Add(this.form.value));

  }
}
