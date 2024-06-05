import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastTypes } from 'src/app/core/enums';
import { IGetChatListDto } from 'src/app/core/interfaces';
import { ChatService } from 'src/app/core/services/chat.service';
import { PreLoaderService } from 'src/app/core/services/preloader.service';
import { TokenHelper } from 'src/app/core/utilities/helpers/token.helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {
  @Output() selectedChat = new EventEmitter<IGetChatListDto>();
  @Output() chatLength = new EventEmitter<number>();

  initialChatList: IGetChatListDto[] = [];
  chatLists: IGetChatListDto[] = [];
  isResultEmpty = false;

  chatListForm: FormGroup = new FormGroup({});
  chatListSubscription: Subscription | undefined;

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
    this.subscribeToChatListUpdates();
  }

  ngOnDestroy(): void {
    if (this.chatListSubscription) {
      this.chatListSubscription.unsubscribe();
    }
    this.service.disconnectHubConnection();
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
        this.chatLength.emit(this.initialChatList.length);
      },

      error: (errorResponse) => {
        this.preloader.hide();
        const errorObject = errorResponse.error;

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

  buildChatSearchForm() {
    this.chatListForm = this.fb.group({
      search: [''],
    });

    this.chatListForm.get('search')?.valueChanges.subscribe((value: any) => {
      this.filterChats(value);
    });
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
      this.chatLists = [...this.initialChatList];
      this.isResultEmpty = false;
      return;
    }

    const searchTerm = value.toLowerCase().trim();
    this.chatLists = this.initialChatList.filter(
      chatList => chatList.chatName.toLowerCase().includes(searchTerm)
    );

    this.isResultEmpty = this.chatLists.length <= 0;
  }

  private subscribeToChatListUpdates() {
    this.chatListSubscription = this.service.chatList$.subscribe((updatedChatList: IGetChatListDto[]) => {
      this.initialChatList = this.chatLists = updatedChatList;
      this.filterChats(this.chatListForm.get('search')?.value || '');
    });
  }
}
