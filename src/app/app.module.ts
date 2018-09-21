import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppComponent } from './app.component';

// store
import { LoginComponent } from './components/login/login.component';

//state
import { AuthState } from './store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// meterial design component
import { MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([
      AuthState,
    ]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //meterial
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
