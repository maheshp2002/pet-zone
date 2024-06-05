import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConversationMessage } from 'src/app/core/interfaces/conversation-message';

const apiUrl: string = 'https://api.openai.com/v1/chat/completions';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
    public messages: IConversationMessage[] =     [{
        text: "Hey there",
        from: "user"
      },
      {
        text: "Hello User, I am you Pet Assistant",
        from: "bot"
      }];

  constructor(private http: HttpClient) {}

  submitPrompt(userInput: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const body = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: userInput}],
  });

    return this.http.post<any>(apiUrl, body, { headers });
  }
}
