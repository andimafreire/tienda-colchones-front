import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private user: any;

    constructor(private router: Router) {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    getUser(): any {
        return this.user;
    }

    login(user: any): void {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['']);
    }

    logout(): void {
        localStorage.removeItem('user');
        this.user = null;
        this.router.navigate(['/login']);
    }
}