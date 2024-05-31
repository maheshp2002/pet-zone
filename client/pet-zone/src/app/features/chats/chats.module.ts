import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    ChatListComponent,
    ChatWindowComponent,
    ChatLayoutComponent
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextareaModule,
    FileUploadModule
  ]
})
export class ChatsModule { }
