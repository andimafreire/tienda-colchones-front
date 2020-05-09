import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {}

  getProductList(type: string, page: string, pageSize: string): Observable<any> {
    const params =  new HttpParams().set("type",type).set("page", page).set("pagesize", pageSize);

    return this.http.get(`${environment.backendUrl}products/`, {params: params});
  }
}
