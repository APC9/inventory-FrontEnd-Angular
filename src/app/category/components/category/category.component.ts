import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { categoriesState } from '../../../store/categories/categories.reducer';
import { loadCategories } from '../../../store/categories/categories.actions';
import { Category } from '../../../interfaces/categoryResponse.interface';
import { SharedModule } from '../../../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  displayedColumns: string[] = [ 'id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  private store = inject( Store<categoriesState>);
  private clearSupcriptions!: Subscription;

  ngOnInit(): void {
    this.clearSupcriptions =  this.store.select('categories')
      .subscribe( ({categories}) =>{
        this.categories = categories;
        this.dataSource = new MatTableDataSource<Category>(this.categories)
      })

    this.store.dispatch( loadCategories() )
  }

  ngOnDestroy(): void {
    this.clearSupcriptions.unsubscribe();
  }

}
