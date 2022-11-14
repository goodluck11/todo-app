import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = `https://dummyjson.com`

  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`)
  }
}
