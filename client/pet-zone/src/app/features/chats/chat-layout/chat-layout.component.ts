import { Component, Input } from '@angular/core';
import { IGetChatListDto } from 'src/app/core/interfaces';

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss']
})
export class ChatLayoutComponent {
  @Input('chat') chat: IGetChatListDto = {
    id: 0,
    createdAt: '',
    chatName: '',
    isBlocked: false,
    isRemoved: false,
    icon: ''
  };

  handleChatChange(selectedChat: IGetChatListDto) {
    this.chat = selectedChat;
  }
}
