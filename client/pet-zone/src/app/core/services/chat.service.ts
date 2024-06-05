import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAddChatDto, IAddMessageDto, IBlockOrRemoveChat, IGetChatListDto, IResponse } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private chatUrl = "https://localhost:7224/api/chat";
    private hubUrl = "https://localhost:7224/chatHub"; // SignalR Hub URL
    private hubConnection!: HubConnection;

    private chatListSubject = new BehaviorSubject<IGetChatListDto[]>([]);
    chatList$: Observable<IGetChatListDto[]> = this.chatListSubject.asObservable();

    constructor(private http: HttpClient) {
        this.createHubConnection();
    }

    private createHubConnection() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(this.hubUrl)
            .build();

        this.hubConnection.start()
            .catch(err => console.error('Error starting SignalR connection: ', err));

        this.hubConnection.on('ReceiveChatList', (chatList: IGetChatListDto[]) => {
            this.chatListSubject.next(chatList);
        });

        this.hubConnection.on('ChatUpdated', (chat: IGetChatListDto) => {
            const currentChats = this.chatListSubject.value;
            const chatIndex = currentChats.findIndex(c => c.id === chat.id);
            if (chatIndex !== -1) {
                currentChats[chatIndex] = chat;
                this.chatListSubject.next([...currentChats]);
            }
        });

        this.hubConnection.on('ChatRemoved', (chatId: number) => {
            const currentChats = this.chatListSubject.value.filter(c => c.id !== chatId);
            this.chatListSubject.next([...currentChats]);
        });
    }

    getAllChat() {
        return this.http.get(this.chatUrl + "/chat");
    }

    createChat(model: IAddChatDto) {
        return this.http.post(this.chatUrl + "/chat", model);
    }

    blockChat(model: IBlockOrRemoveChat) {
        return this.http.put(this.chatUrl + "/block-chat", model);
    }

    removeChat(model: IBlockOrRemoveChat) {
        return this.http.put(this.chatUrl + "/chat", model);
    }

    addMessage(model: FormData) {
        return this.http.post(this.chatUrl + "/message", model);
    }

    removeMessage(model: IAddMessageDto) {        
        return this.http.put(this.chatUrl + "/message", model);
    }

    getMessage(chatId: number) {        
        return this.http.get(this.chatUrl + "/message/" + chatId);
    }

    disconnectHubConnection() {
        if (this.hubConnection) {
            this.hubConnection.stop().catch(err => console.error('Error stopping SignalR connection: ', err));
        }
    }
}
