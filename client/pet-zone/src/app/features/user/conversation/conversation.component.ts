import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { IConversationMessage } from 'src/app/core/interfaces/conversation-message';

@Component({
  selector: 'app-conversation',
  standalone: true,
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  imports: [CommonModule]
})
export class ConversationComponent implements AfterViewChecked {
  @ViewChild('conversationContainer', { static: true }) conversationContainer!: ElementRef<HTMLDivElement>;

  @Input() messages: IConversationMessage[] = [];

  ngAfterViewChecked(): void {
    const calculatedTop = this.conversationContainer.nativeElement.scrollHeight 
        - this.conversationContainer.nativeElement.clientHeight;
    if (calculatedTop != this.conversationContainer.nativeElement.scrollTop)
    this.conversationContainer.nativeElement.scrollTop = calculatedTop;
  }
  
}
