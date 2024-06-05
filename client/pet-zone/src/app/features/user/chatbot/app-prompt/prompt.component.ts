import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    FormsModule],
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent {
  userInput: string = '';
  @Output() textChange = new EventEmitter<string>();

  constructor() {}

  sendMessage() {
    if (this.userInput.trim() !== '') {
      this.textChange.emit(this.userInput.trim());
      this.userInput = ''; // Clear input after sending message
    }
  }
}
