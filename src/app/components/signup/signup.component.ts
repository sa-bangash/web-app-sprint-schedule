import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthAction } from '../../store';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      name: [],
      email: [],
      password: [],
      confirmPassword: [],
    })
  }

  onSubmit() {
    this.store.dispatch(new AuthAction.Signup(this.form.value));
  }
}
