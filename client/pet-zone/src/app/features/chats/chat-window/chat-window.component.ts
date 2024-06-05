import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/core/configs/app.config';
import { FileValidator } from 'src/app/core/validators/file.validator';
import { IGetChatListDto, IGetMessageDto } from 'src/app/core/interfaces';
import { ChatService } from 'src/app/core/services/chat.service';
import { PreLoaderService } from 'src/app/core/services/preloader.service';
import { ToastTypes } from 'src/app/core/enums';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any;
  @Input('chat') chat!: IGetChatListDto;
  @Input('isChatSelected') isChatSelected!: Boolean;
  @Input('chatLength') chatLength!: number;

  messages: IGetMessageDto[] = [];
  isFileSelected = false;

  groupedMessages: any[] = [];
  chatForm: FormGroup = new FormGroup({});
  fileSizeInBytes: number = this.constants.fileSizeInBytes;

  constructor(
    private readonly fb: FormBuilder,
    private readonly constants: Constants,
    private readonly fileValidator: FileValidator,
    private readonly service: ChatService,
    private readonly preloader: PreLoaderService,
    private readonly toast: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllMessages();
    this.buildMessageForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chat'] && !changes['chat'].isFirstChange()) {
      this.updateFormWithNewChatId();
      this.getAllMessages();
    }
  }

  updateFormWithNewChatId() {
    this.chatForm.patchValue({
      chatId: this.chat.id
    });
  }

  getAllMessages() {
    this.service.getMessage(this.chat.id).subscribe({
      next: (response: any) => {
        this.preloader.hide();
        this.messages = response.result;  
        this.groupMessagesByDate();
      },

      error: (errorResponse) => {
        const errorObject = errorResponse.error;        
        
        // Iterate through the keys in the error object
        if (errorResponse.status == 400) {          
          for (const key in errorObject) {
            if (Object.prototype.hasOwnProperty.call(errorObject, key)) {
              const errorMessage = errorObject[key];
              this.toast.add({
                severity: ToastTypes.ERROR,
                summary: errorMessage
              });
            }
          }
        } else {
          this.toast.add({
            severity: ToastTypes.ERROR,
            summary: 'Server Error'
          });
        }
      }
    });
  }

  groupMessagesByDate() {
    const groups = this.messages.reduce((acc, message) => {
      const date = message.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(message);
      return acc;
    }, {} as { [key: string]: IGetMessageDto[] });

    this.groupedMessages = Object.keys(groups).map(date => ({
      date,
      messages: groups[date]
    }));
  }

  buildMessageForm() {
    this.chatForm = this.fb.group({
      chatId: [this.chat.id],
      isFile: [false],
      content: [{value: '', disabled: false}],
      file: ['', [this.fileValidator.fileSizeValidator(this.constants.fileSizeInBytes)]]
    });
  }

  checkFileDirty(): void {
    const fileControl = this.chatForm.get('file');
    const messageControl = this.chatForm.get('message');
    if (fileControl?.dirty && fileControl.value) {
      messageControl?.disable();
      this.chatForm.get('isFile')?.setValue(true);
      this.isFileSelected = true;
    } else {
      messageControl?.enable();
      this.chatForm.get('isFile')?.setValue(false);
      this.isFileSelected = false
    }
  }

  onCancelSelect() {
    this.chatForm.patchValue({ file: '' });
    this.chatForm.get('file')?.markAsPristine();
    this.fileUpload.clear();
    this.checkFileDirty();
  }

  onFileSelect({ files }: { files: File[] }) {
    const file = files[0];
    this.chatForm.patchValue({ file: file });
    this.chatForm.get('file')?.markAsDirty();
    if (this.fileUpload) {
      this.fileUpload.clear();
    }
    this.checkFileDirty();
  }

  onSubmit() {        
    if (this.chatForm.get('file')?.dirty || (this.chatForm.get('content')?.dirty && this.chatForm.get('content')?.value != '')) {
      const formData = new FormData();
      const temp = this.chatForm.value;
      Object.keys(temp).forEach((key) => {
        formData.append(key, temp[key])
      });
            
      this.service.addMessage(formData).subscribe({
        next: () => {
          this.chatForm.patchValue({content: ''})
          this.chatForm.get('isFile')?.setValue(false);
          this.isFileSelected = false
          this.getAllMessages();
        },
        
        error: () => {
          this.toast.add({
            severity: ToastTypes.ERROR,
            summary: 'An error occurred while sending'
          });
        }
      });
    }
  }
}
