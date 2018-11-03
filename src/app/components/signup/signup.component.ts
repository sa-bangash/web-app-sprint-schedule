import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthAction, AuthState } from '../../store';
import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ESignupStatus } from '../../app.constant';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  @Select(AuthState.error)
  error: Observable<any>;
  form: FormGroup;
  space: ESignupStatus;

  constructor(private fb: FormBuilder, private store: Store, private activeRoute: ActivatedRoute) {
    this.space = this.activeRoute.snapshot.data.space;

    this.form = this.fb.group({
      name: [],
      email: [],
      password: [],
      workSpace: ['', [this.isCreateWorkSpace ? Validators.required : Validators.nullValidator]],
      confirmPassword: [],
    })
    if (!this.isCreateWorkSpace) {
      this.form.get('workSpace').disable();
    }
  }

  get isCreateWorkSpace() {
    return this.space === ESignupStatus.workSpaceSignUp;
  }

  onSubmit() {
    if (this.isCreateWorkSpace) {
      this.store.dispatch(new AuthAction.CreateWorkSpace(this.form.value))
    } else {
      this.store.dispatch(new AuthAction.Signup(this.form.value));
    }
  }
}
