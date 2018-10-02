import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { AppUserAuth } from '../models/app-user-auth.model';
import { AppUser } from '../models/app-user.model';
import { LOGIN_MOCKS } from '../models/login-mocks.model';
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
    this.securityObject.canAccessProducts = false;
    this.securityObject.canAddProduct = false;
    this.securityObject.canSaveProduct = false;
    this.securityObject.canAccessCategories = false;
    this.securityObject.canAddCategory = false;
    localStorage.removeItem('bearerToken');
  }

logout(): void {
this.resetSecurityObject();
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
