import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}api/v1/users/login/`, user);
  }

  getProductList(type: string, page: string, pageSize: string): Observable<any> {
    const params =  new HttpParams().set("type",type).set("page", page).set("pagesize", pageSize);

    return this.http.get(`${environment.backendUrl}api/v1/products/`, {params: params});
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${environment.backendUrl}api/v1/products/${id}/`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}api/v1/products/`, product);
  }

  editProduct(product: any, id: string): Observable<any> {
    return this.http.put(`${environment.backendUrl}api/v1/products/${id}/`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${environment.backendUrl}api/v1/products/${id}/`);
  }
}
