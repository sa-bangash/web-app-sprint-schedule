import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

import { AppComponent } from './app.component';

// store
import { LoginComponent } from './components/login/login.component';

//state
import { AuthState } from './store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// meterial design component
import { MatInputModule, MatCardModule, MatButtonModule, MatGridListModule, MatMenuModule, MatIconModule } from '@angular/material';
import { SignupComponent } from './components/signup/signup.component';
//routes
import { routes } from './app.route';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    routes,
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([
      AuthState,
    ]),
    NgxsRouterPluginModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //meterial
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
