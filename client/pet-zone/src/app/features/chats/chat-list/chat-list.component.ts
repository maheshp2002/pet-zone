import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastTypes } from 'src/app/core/enums';
import { IGetChatListDto } from 'src/app/core/interfaces';
import { ChatService } from 'src/app/core/services/chat.service';
import { PreLoaderService } from 'src/app/core/services/preloader.service';
import { TokenHelper } from 'src/app/core/utilities/helpers/token.helper';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  @Output() selectedChat = new EventEmitter<IGetChatListDto>();

  initialChatList: IGetChatListDto[] = [
    { chatName: 'Jacob Jones', createdAt: '', id: 0, isBlocked: false, isRemoved: false, icon: '' },
    { chatName: 'James Jones', createdAt: '', id: 0, isBlocked: false, isRemoved: false, icon: '' },
  ];
  chatLists: IGetChatListDto[] = [];
  isResultEmpty = false;

  chatListForm: FormGroup = new FormGroup({});

  constructor(
    private readonly fb: FormBuilder,
    private readonly tokenHelper: TokenHelper,
    private readonly service: ChatService,
    private readonly preloader: PreLoaderService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.chatLists = [...this.initialChatList];
    this.preloader.show();
    this.buildChatSearchForm();
    this.getChatList();
  }

  cancelSearch(): void {
    this.chatListForm.get('search')?.setValue('');
    this.filterChats('');
  }

  getChatList() {
    this.service.getAllChat().subscribe({
      next: (response: any) => {
        this.preloader.hide();
        this.initialChatList = this.chatLists = response.result;
      },

      error: (errorResponse) => {
        const errorObject = errorResponse.error;

        // Iterate through the keys in the error object
        if (errorResponse.status == 400) {
          for (const key in errorObject) {
            if (Object.prototype.hasOwnProperty.call(errorObject, key)) {
              const errorMessage = errorObject[key];
              this.messageService.add({
                severity: ToastTypes.ERROR,
                summary: errorMessage
              });
            }
          }
        } else {
          this.messageService.add({
            severity: ToastTypes.ERROR,
            summary: 'Server Error'
          });
        }
      }
    });
  }

  /**
   * Constructs the job search form using the FormBuilder.
   */
  buildChatSearchForm() {
    this.chatListForm = this.fb.group({
      search: [''],
    })

    this.chatListForm.get('search')?.valueChanges.subscribe((value: any) => {
      this.filterChats(value);
    })
  }

  trackByChatListId(index: number, chat: IGetChatListDto) {
    return chat.id;
  }

  getAvatarUrl(name: string): string {
    return `https://avatar.iran.liara.run/public`;
  }

  onChatSelect(chat: IGetChatListDto) {
    this.selectedChat.emit(chat);
  }

  onBackButtonClick() {
    const userRole = this.tokenHelper.getDecodedToken().role;
    userRole == 'User'
      ? this.router.navigate(['user'])
      : this.router.navigate(['seller']);
  }

  filterChats(value: string) {
    if (!value) {
      this.chatLists = [...this.initialChatList]; // Reset to initial jobs if the search input is empty
      this.isResultEmpty = false;
      return;
    }

    const searchTerm = value.toLowerCase().trim();
    this.chatLists = this.initialChatList.filter(
      chatList => chatList.chatName.toLowerCase().includes(searchTerm)
    );

    this.isResultEmpty = this.chatLists.length <= 0 ? true : false;
  }
}
