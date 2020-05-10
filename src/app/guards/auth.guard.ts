import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot) {
        const currentUser: any = this.auth.getUser();
        if (currentUser) {
            if (route.data.login) {
                // not authorised to login page so redirect to home page
                this.router.navigate(['']);
                return false;
            }
            // authorised so return true
            return true;
        }

        if (route.data.login) {
            // authorised so return true
            return true;
        } {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login']);
            return false;
        }    
    }
}