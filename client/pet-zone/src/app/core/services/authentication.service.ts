import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../interfaces';
import { ILoginDto, IRegisterDto, IResetPasswordDto } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    authenticationUrl = "https://localhost:7224/api/authentication";

    constructor(private http: HttpClient) {

    }

    login(model: ILoginDto) {
        return this.http.post(this.authenticationUrl + "/login", model);
    }

    register(model: IRegisterDto) {
        return this.http.post(this.authenticationUrl + "/register", model);
    }

    getSellerProfile(sellerId: string) {
        return this.http.get(this.authenticationUrl + "/seller-profile/" + sellerId);
    }

    getAdminProfile(adminId: string) {
        return this.http.get(this.authenticationUrl + "/admin-profile/" + adminId);
    }

    getUserProfile(userId: string) {
        return this.http.get(this.authenticationUrl + "/user-profile/" + userId);
    }

    updateProfile(file: FormData) {        
        return this.http.put<IResponse>(this.authenticationUrl + "/update-profile", file);
    }

    forgotPassword(email: string) {        
        return this.http.post<IResponse>(this.authenticationUrl + "/forgot-password", { email });
    }

    resetPassword(dto: IResetPasswordDto) {        
        return this.http.put<IResponse>(this.authenticationUrl + "/change-password", dto);
    }
}