import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../interfaces';
import { ILoginDto, IRegisterDto, IResetPasswordDto } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    userUrl = "https://localhost:7116/api/user/authentication";
    adminUrl = "https://localhost:7116/api/admin/authentication";
    sellerUrl = "https://localhost:7116/api/seller/authentication";

    constructor(private http: HttpClient) {

    }

    login(model: ILoginDto) {
        return this.http.post(this.userUrl + "/login", model);
    }

    register(model: IRegisterDto) {
        return this.http.post(this.userUrl + "/register", model);
    }

    getSellerProfile(sellerId: string) {
        return this.http.get(this.userUrl + "/seller-profile/" + sellerId);
    }

    getAdminProfile(adminId: string) {
        return this.http.get(this.userUrl + "/admin-profile/" + adminId);
    }

    getUserProfile(userId: string) {
        return this.http.get(this.userUrl + "/user-profile/" + userId);
    }

    uploadImage(file: FormData) {        
        return this.http.post<IResponse>(this.userUrl + "/upload-image", file);
    }

    forgotPassword(email: string) {        
        return this.http.post<IResponse>(this.userUrl + "/forgot-password", { email });
    }

    resetPassword(dto: IResetPasswordDto) {        
        return this.http.put<IResponse>(this.userUrl + "/change-password", dto);
    }
}