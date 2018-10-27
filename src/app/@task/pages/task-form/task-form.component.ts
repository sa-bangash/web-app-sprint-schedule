import { Component, OnInit } from '@angular/core';
import { Store, ofActionSuccessful, Actions, Select } from '@ngxs/store';
import { TaskAction, TaskState, TaskModel } from '../../store/task.state.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SprintAction, SprintState, SprintModel } from '../../store';
@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Select(TaskState.taskError)
  error: Observable<TaskModel>;

  @Select(SprintState.fetchAll)
  sprintsList: Observable<SprintModel[]>

  form: FormGroup;
  constructor(
    private store: Store,
    private _fb: FormBuilder,
    private action$: Actions,
  ) {
    this.store.dispatch(new SprintAction.FetchAll())
    this.form = this._fb.group({
      description: [],
      estimatedTime: [],
      storyNumber: [],
      date: [],
      sprintId: [],
    })
  }

  ngOnInit() {
    this.sprintsList.subscribe((resp) => {
      if (resp.length > 0) {
        this.form.patchValue({
          sprintId: resp[resp.length - 1]._id
        })
      }

    })
  }

  displayFn(sprint?: SprintModel): string | undefined {
    return sprint ? sprint.name : undefined;
  }
  onSubmit() {
    console.log(this.form.value)
    this.action$.pipe(ofActionSuccessful(TaskAction.Add)).subscribe(() => {
      this.form.reset();
    })
    this.store.dispatch(new TaskAction.Add(this.form.value));

  }
}
