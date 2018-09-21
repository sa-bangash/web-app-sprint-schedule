import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthAction } from '../../store';
import { Store } from '@ngxs/store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
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
