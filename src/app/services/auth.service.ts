import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { IUser } from "../models/IUser";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    private token: string | null = null;

    setToken(token: string | null): void {
        this.token = token;
    }

    getToken(): string {
        return this.token === null ? "" : this.token;
    }

    login(user: IUser): Observable<{token: string}> {
        return this.http.post<{token: string}>('/api/auth/login', user)
            .pipe(
                tap(
                    ({token}) => {
                        localStorage.setItem('auth-token', token);
                        this.setToken(token);
                        localStorage.setItem('auth-email', user.email || "");
                    }
                )
            );
    }

    register(user: IUser): Observable<IUser> {
        return this.http.post<IUser>('/api/auth/register', user)
        .pipe(
            tap(
                () => {
                    this.login(user);
                }
            )
        );
    }

    isAuth(): boolean {
        return !!this.token;
    }

    logout(): void {
        this.setToken(null);
        localStorage.clear();
    }

}