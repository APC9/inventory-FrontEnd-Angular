import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap, mergeMap, throwError } from 'rxjs';

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

  getProductByName( name: string ):Observable<Product>{
    return this.httpClient.get<ProductResponse>(`${this.baseUrl}/products/filter/${name}`)
    .pipe(
      map( resp => resp.productResponse.products[0])
    )
  }


  createProduct( product: Product, file: any ){
    const sendData = this.convertProductToSendData(product, file)
    return this.httpClient.post<ProductResponse>(`${this.baseUrl}/products`, sendData)
    .pipe(
      map( resp => resp.productResponse.products)
    )
  }

  updateProduct( product: Product, file?: any ){
    const sendData = this.convertProductToSendData(product, file)
    return this.httpClient.put<ProductResponse>(`${this.baseUrl}/products/${product.id}`, sendData)
    .pipe(
      map( resp => resp.productResponse.products[0])
    )
  }

  deleteProductById( id: number ){
    return this.httpClient.delete<ProductResponse>(`${this.baseUrl}/products/${id}`)
    .pipe(
      map( resp => resp.productResponse.products[0])
    )
  }


  private convertProductToSendData( product: Product, file: any){

    let data = {
      name: product.name,
      price: product.price,
      account: product.account,
      categoryId: +product.category,
      picture: file,
    }

     // FormData que sera enviada en el metodo crear el product
     const sendData = new FormData()
     sendData.append('name', data.name)
     sendData.append('price', data.price.toString() )
     sendData.append('account', data.account.toString())
     sendData.append('categoryId', data.categoryId.toString())
     sendData.append('picture', data.picture, data.picture.name )

     return sendData;
  }


  exportToExcel(){
    return this.httpClient.get( `${this.baseUrl}/products/export/excel`, {
      responseType: 'blob'
    })
  }
}
