import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerLayoutComponent } from './seller-layout/seller-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { ErrorMessageComponent } from 'src/app/shared/error-message/error-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { NoDataFoundComponent } from 'src/app/shared/no-data-found/no-data-found.component';
import { TableModule } from 'primeng/table';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    SellerLayoutComponent,
    NavbarComponent,
    HomepageComponent,
    ImageModalComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    ErrorMessageComponent,
    ConfirmDialogModule,
    SharedModule,
    DialogModule,
    TooltipModule,
    FontAwesomeModule,
    FileUploadModule,
    ReactiveFormsModule,
    DropdownModule,
    NoDataFoundComponent,
    TableModule,
    ImageModule,
    InputTextareaModule,
    DropdownModule
  ]
})
export class SellerModule { }
