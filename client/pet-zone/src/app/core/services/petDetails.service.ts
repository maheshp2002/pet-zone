import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddPetDetailsDto, IMasterDataDto } from '../interfaces/IPetDetailsDto';

@Injectable({
    providedIn: 'root'
})
export class PetDetailsService {

    petDetailsUserUrl = "https://localhost:7224/api/user";
    petDetailsSellerUrl = "https://localhost:7224/api/seller";
    masterUrl = "https://localhost:7224/api/master";

    constructor(private http: HttpClient) {

    }

    getAllPetDetailsUser(userId: string) {
        return this.http.get(this.petDetailsUserUrl + "/pet/" + userId);
    }

    getPetDetailsById(id: number) {
        return this.http.get(this.petDetailsUserUrl + "/pet-details/" + id);
    }

    getAllPetDetailsSeller(userId: string) {
        return this.http.get(this.petDetailsSellerUrl + "/pet-details/" + userId);
    }

    addPetDetails(model: FormData) {
        return this.http.post(this.petDetailsSellerUrl + "/pet-details", model);
    }

    updatedPetDetails(model: FormData) {
        return this.http.put(this.petDetailsSellerUrl + "/pet-details", model);
    }

    getMaster() {
        return this.http.get(this.masterUrl + "/master");
    }

    addBreed(model: IMasterDataDto) {
        return this.http.post(this.masterUrl + "/breed", model);
    }

    addCategory(model: IMasterDataDto) {
        return this.http.post(this.masterUrl + "/category", model);
    }
}