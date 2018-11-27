import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { AppUserAuth } from '../models/app-user-auth.model';
import { AppUser } from '../models/app-user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators/tap';
const API_URL = 'http://localhost:5000/api/security/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  constructor(private http: HttpClient) {}

  resetSecurityObject(): void {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    this.securityObject.claims = [];
    // this.securityObject.canAccessProducts = false;
    // this.securityObject.canAddProduct = false;
    // this.securityObject.canSaveProduct = false;
    // this.securityObject.canAccessCategories = false;
    // this.securityObject.canAddCategory = false;
    localStorage.removeItem('bearerToken');
  }

logout(): void {
this.resetSecurityObject();
}

// This method can be called a couple of different ways
  // *hasClaim="'claimType'"  // Assumes claimValue is true
  // *hasClaim="'claimType:value'"  // Compares claimValue to value
  // *hasClaim="['claimType1','claimType2:value','claimType3']"
  hasClaim(claimType: any, claimValue?: any) {
    let ret = false;

    // See if an array of values was passed in.
    if (typeof claimType === 'string') {
      ret = this.isClaimValid(claimType, claimValue);
    } else {
      const claims: string[] = claimType;
      if (claims) {
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          // If one is successful, then let them in
          if (ret) {
            break;
          }
        }
      }
    }

    return ret;
  }

private isClaimValid(claimType: string, claimValue?: string): boolean {
  let ret = false;
  let auth: AppUserAuth = null;
  // Retrieve secuirty object
  auth = this.securityObject;
  if (auth) {
    // See the claim type has value
    // *hasClaim="'claimType:value'"
    if (claimType.indexOf(':') > 0 ) {
      const words: string[] = claimType.split(':');
      claimType = words[0].toLocaleLowerCase();
      claimValue = words[1];
    } else {
      claimType = claimType.toLocaleLowerCase();
      // Either Get the claim value ,or assume to be the true
      claimValue = claimValue ? claimValue : 'true';
    }
    // Attempt to find the claim
    ret = auth.claims.find(c => c.claimType.toLocaleLowerCase() === claimType &&
                            c.claimValue === claimValue) != null;
  }

  return ret;
}

  login(entity: AppUser): Observable<AppUserAuth> {
    // Initialize security object
    this.resetSecurityObject();

    // // Use object assign to update the current object
    // // NOTE: Don't create a new AppUserAuth object
    // //       because that destroys all references to object
    // Object.assign(
    //   this.securityObject,
    //   LOGIN_MOCKS.find(
    //     user => user.userName.toLowerCase() === entity.userName.toLowerCase()
    //   )
    // );
    // if (this.securityObject.userName !== '') {
    //   // Store into local storage
    //   localStorage.setItem('bearerToken', this.securityObject.bearerToken);
    // }

    this.http.post<AppUserAuth>(API_URL + 'login', entity, httpOptions).subscribe(resp => {
      Object.assign(
      this.securityObject,
      resp
    );
    if (this.securityObject.userName !== '') {
      // Store into local storage
      localStorage.setItem('bearerToken', this.securityObject.bearerToken);
    }
    });
    return of<AppUserAuth>(this.securityObject);
  }

}
