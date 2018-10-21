import { Component, OnInit } from '@angular/core';
import { Store, Actions, Select, ofActionSuccessful } from '@ngxs/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SprintState, SprintAction } from '../../store/sprint.state.model';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css']
})
export class SprintFormComponent implements OnInit {
  form: FormGroup;

  @Select(SprintState.sprintError)
  error: Observable<any>;

  constructor(
    private store: Store,
    private _fb: FormBuilder,
    private action$: Actions,
  ) {
    this.form = this._fb.group({
      name: [],
      start: [],
      end: [],
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.action$.pipe(ofActionSuccessful(SprintAction.Add)).subscribe(()=>this.form.reset())
    this.store.dispatch(new SprintAction.Add(this.form.value))
  }
}
