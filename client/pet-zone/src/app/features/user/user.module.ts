import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';

import { UserRoutingModule } from './user-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ConfirmationService } from 'primeng/api';
import { ErrorMessageComponent } from 'src/app/shared/error-message/error-message.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FiltersComponent } from './filters/filters.component';
import { GridComponent } from './grid/grid.component';
import { DropdownModule } from 'primeng/dropdown';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    UserLayoutComponent,
    HomepageComponent,
    NavbarComponent,
    GridComponent,
    FiltersComponent,
    PetDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ErrorMessageComponent,
    ConfirmDialogModule,
    SharedModule,
    DialogModule,
    TooltipModule,
    FontAwesomeModule,
    FileUploadModule,
    DropdownModule,
    ChatbotComponent,
    MatIconModule
  ],
  providers: [ConfirmationService]
})
export class UserModule { }
