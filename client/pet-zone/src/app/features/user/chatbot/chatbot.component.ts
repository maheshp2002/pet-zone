import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConversationComponent } from '../conversation/conversation.component';
import { MatIconModule } from '@angular/material/icon';
import { PromptComponent } from './app-prompt/prompt.component';
import { ChatBotService } from '../../../core/services/chatbot.service';
import { HttpClientModule } from '@angular/common/http';
import { IConversationMessage } from 'src/app/core/interfaces/conversation-message';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule,
    HttpClientModule,
    ConversationComponent,
    PromptComponent,
    MatIconModule],
  standalone: true,
  providers: [ChatBotService],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  public messages: IConversationMessage[] = [];
  chatboxOpen: boolean = false;

  constructor(private chatBotService: ChatBotService) {}

  ngOnInit() {
    this.messages = this.chatBotService.messages;
  }

  toggleChatbox() {
    this.chatboxOpen = !this.chatboxOpen;
  }

  handlePromptChange($event: any) {
    this.messages.push({
      from: 'user',
      text: $event
    });
    this.chatBotService.submitPrompt($event).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.messages.push({
            from: 'bot',
            text: res.choices[0].message.content.trim()
          })}, 500);
      },
      error: (err) => {
        setTimeout(() => {
          this.messages.push({
            from: 'bot',
            text: err.error?.error?.message
          });
        }, 500);
    }});
  }
}
