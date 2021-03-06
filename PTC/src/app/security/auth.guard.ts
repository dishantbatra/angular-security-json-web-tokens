import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { AppUserAuth } from './app-user-auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authObject: AppUserAuth = null;
   constructor(private securityService: SecurityService, private router: Router) {
    this.authObject = securityService.securityObject;
   }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const claimType: string = next.data['claimType'];
      if (this.authObject.isAuthenticated && this.securityService.hasClaim(claimType, null)) {
        return true;
      } else {
        this.router.navigate(['login'], {queryParams: {returnUrl: state.url}} );
      }
  }
}
