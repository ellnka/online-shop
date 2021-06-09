import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "../models/IUser";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor( private http: HttpClient) {}

    fetchCurrentUser(): Observable<IUser> {
        const userEmail = localStorage.getItem('auth-email') || "";
        return this.http.get<IUser>(`/api/user/${userEmail}`);
    }

    fetchById(user: IUser): Observable<IUser> {
        return this.http.get<IUser>(`/api/user/${user.email}`);
    }

    update(user: IUser): Observable<IUser> {
        const fd = this._createFormData(user);
        return this.http.patch<IUser>(`/api/user/${user._id}`, user);
    }

    _createFormData(user: IUser): FormData {
        const fd = new FormData();

        fd.append('name', user.name || "");
        fd.append('surname', user.surname || "");
        fd.append('address', user.address || "");
        fd.append('password', user.password || "");
        fd.append('email', user.email || "");

        return fd;
    }

}