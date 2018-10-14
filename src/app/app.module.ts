import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

//state
import { AuthState, TaskState } from './store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// meterial design component
import { MatSidenavModule, MatToolbarModule, MatInputModule, MatCardModule, MatButtonModule, MatGridListModule, MatMenuModule, MatIconModule } from '@angular/material';
import { SignupComponent } from './components/signup/signup.component';
//routes
import { routes } from './app.route';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';

// service
import { TokenHttpinterceptor } from './http-helper/token.httpinterceptor.service';
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
      TaskState,
    ]),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: 'Auth.token',
    }),
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
    MatToolbarModule,
    MatSidenavModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpinterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
