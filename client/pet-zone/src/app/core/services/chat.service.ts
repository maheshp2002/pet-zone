import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddChatDto, IAddMessageDto, IBlockOrRemoveChat, IGetChatListDto, IResponse } from '../interfaces';
import { ILoginDto, IRegisterDto, IResetPasswordDto } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    chatUrl = "https://localhost:7224/api/chat";

    constructor(private http: HttpClient) {

    }

    getAllChat() {
        return this.http.get(this.chatUrl + "/chat");
    }

    createChat(model: IAddChatDto) {
        return this.http.post(this.chatUrl + "/chat", model);
    }

    blockChat(model: IBlockOrRemoveChat) {
        return this.http.put(this.chatUrl + "/chat",  model);
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
}