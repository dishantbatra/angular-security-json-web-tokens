import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';

const API_URL = 'http://localhost:5000/api/product/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ProductService {
  // constructor(private http: HttpClient, private securityService: SecurityService ) {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    // const httpOption = new HttpHeaders().set('Authorization', 'Bearer ' + this.securityService.securityObject.bearerToken );
    return this.http.get<Product[]>(API_URL);
    // return this.http.get<Product[]>(API_URL, {headers: httpOption});
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(API_URL + id.toString());
  }

  addProduct(entity: Product): Observable<Product> {
    return this.http.post<Product>(API_URL, entity, httpOptions);
  }

  updateProduct(entity: Product): Observable<any> {
    return this.http.put(API_URL, entity, httpOptions);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(API_URL + id.toString(), httpOptions);
  }
}
