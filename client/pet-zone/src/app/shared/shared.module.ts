import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FixedScrollDirective, PhoneNumberCodeDirective } from '../core/directives';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
import { PreLoaderComponent } from './pre-loader/pre-loader.component';

@NgModule({
  declarations: [
    PhoneNumberCodeDirective,
    PreLoaderComponent,
    FixedScrollDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    NoDataFoundComponent  
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    NoDataFoundComponent,
    PhoneNumberCodeDirective,
    PreLoaderComponent,
    FixedScrollDirective
  ]
})
export class SharedModule { }
