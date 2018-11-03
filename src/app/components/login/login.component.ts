import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthAction, AuthState } from '../../store';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  @Select(AuthState.error)
  error: Observable<any>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      email: [],
      password: [],
    })
  }

  ngOnInit() {
  }
  onSubmit() {
    this.store.dispatch(new AuthAction.Login(this.form.value));
  }
}
