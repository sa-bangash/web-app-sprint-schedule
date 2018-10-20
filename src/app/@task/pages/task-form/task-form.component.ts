import { Component, OnInit } from '@angular/core';
import { Store, ofActionSuccessful, Actions } from '@ngxs/store';
import { TaskAction } from '../../store/task.state.model';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
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
