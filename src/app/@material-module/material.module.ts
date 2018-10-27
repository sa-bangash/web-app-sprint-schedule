import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatGridListModule,
  MatMenuModule,
  MatIconModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatSelectModule,
} from '@angular/material';

import { LayoutModule } from '@angular/cdk/layout';
@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
  ]
})
export class MaterialModuleModule { }
