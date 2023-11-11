import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { ProductResponse } from '../interfaces/productResponse.interface';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpClient = inject(HttpClient);
  private baseUrl = environment.URL_API;

  getProducts():Observable<Product[]>{
    return this.httpClient.get<ProductResponse>(`${this.baseUrl}/products`)
    .pipe(
      map( resp => resp.productResponse.products)
    )
  }



}
