import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';
import { CategoryResponse } from '../interfaces/categoryResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpClient = inject(HttpClient);
  private baseUrl = environment.URL_API;

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<CategoryResponse>( `${this.baseUrl}/categories`)
    .pipe(
      map( resp => resp.categoryResponse.category)
    )
  }

  createCategory(name: string, description: string){
    return  this.httpClient.post<CategoryResponse>(`${this.baseUrl}/categories`, { name, description })
      .pipe(
        map( resp => resp.categoryResponse.category)
      )
  }

  updateCategory( categoy: Category){
    const { id, ...body } = categoy
    return this.httpClient.put<CategoryResponse>(`${this.baseUrl}/categories/${id}`, { ...body } )
      .pipe(
        map( resp => resp.categoryResponse.category[0])
      )
  }

  deleteCategory(id:number){
    return this.httpClient.delete<CategoryResponse>(`${this.baseUrl}/categories/${id}`)
  }

}
