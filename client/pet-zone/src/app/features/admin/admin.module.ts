import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationService, SharedModule } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { ErrorMessageComponent } from 'src/app/shared/error-message/error-message.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { NoDataFoundComponent } from 'src/app/shared/no-data-found/no-data-found.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavbarComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ErrorMessageComponent,
    ConfirmDialogModule,
    SharedModule,
    DialogModule,
    TooltipModule,
    FontAwesomeModule,
    FileUploadModule,
    ReactiveFormsModule,
    NoDataFoundComponent,
    TableModule,
  ],
  providers: [ConfirmationService]
})
export class AdminModule { }
