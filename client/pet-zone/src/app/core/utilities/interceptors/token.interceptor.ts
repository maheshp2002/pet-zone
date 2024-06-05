import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenHelper } from '../helpers/token.helper';
import { environment } from '../environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private readonly openAiApiUrl = 'https://api.openai.com/v1/chat/completions';
    private readonly openAiApiKey = environment.openAiApiKey;
    
    constructor(private tokenHelper: TokenHelper) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log(this.openAiApiUrl);
        
        if (request.url === this.openAiApiUrl) {
            // For OpenAI API requests, use the OpenAI API key
            const openAiRequest = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${this.openAiApiKey}`)
            });
            return next.handle(openAiRequest);
        } else {
            // For other requests, use the user's JWT token
            const token = this.tokenHelper.getToken();
            if (!token) {
                return next.handle(request);
            }
            const clonedRequest = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            });
            return next.handle(clonedRequest);
        }
    }
}
