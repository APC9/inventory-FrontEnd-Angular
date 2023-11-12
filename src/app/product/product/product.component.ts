import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription, filter } from 'rxjs';

import { productsState } from '../../store/products/product.reducer';
import { loadproducts } from 'src/app/store/products/products.actions';

import { SharedModule } from '../../shared/shared.module';
import { Product } from '../../models/product.model';
import { NewProductComponent } from '../new-product/new-product.component';
import { loadCategories } from '../../store/categories/categories.actions';


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
  private dialog = inject( MatDialog);
  private snackBar = inject( MatSnackBar );

  ngOnInit(): void {
    this.clearSupcriptions = this.store.select('products')
      .pipe( filter( ({products}) => products.length !== 0) )
      .subscribe(({ products }) => {
        this.products = products
        this.dataSource = new MatTableDataSource<Product>(this.products)
        this.dataSource.paginator = this.paginator;
      });

      this.store.dispatch( loadproducts())
      this.store.dispatch(loadCategories())
  }

  ngOnDestroy(): void {
    this.clearSupcriptions.unsubscribe();
  }

  openProductDialog(){
    const dialogRef = this.dialog.open( NewProductComponent, {
      width: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

      if( result === 3 ) return;

      if( result === 2 ){
        this.openSnackBar("Error al Guardar Producto", "Error")
        return;
      }

      this.openSnackBar("Producto Agregada", "Exitosa")
      this.store.dispatch( loadproducts() )
    });
  }

  private openSnackBar( msg: string, action: string ) {
    return this.snackBar.open( msg, action,{
      duration: 3000
    });
  }
}

