import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Subscription, filter } from 'rxjs';

import { productsState } from '../../store/products/product.reducer';
import { loadproducts } from 'src/app/store/products/products.actions';

import { SharedModule } from '../../shared/shared.module';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy{

  products: Product[] = [];
  displayedColumns: string[] = [ 'id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  private store = inject( Store<productsState>);
  private clearSupcriptions!: Subscription;

  ngOnInit(): void {
    this.clearSupcriptions = this.store.select('products')
      .pipe( filter( ({products}) => products.length !== 0) )
      .subscribe(({ products }) => {
        this.products = products
        this.dataSource = new MatTableDataSource<Product>(this.products)
        this.dataSource.paginator = this.paginator;
      });

      this.store.dispatch( loadproducts())
  }

  ngOnDestroy(): void {
    this.clearSupcriptions.unsubscribe();
  }


}

