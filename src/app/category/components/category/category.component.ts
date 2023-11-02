import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { categoriesState } from '../../../store/categories/categories.reducer';
import { loadCategories } from '../../../store/categories/categories.actions';
import { Category } from '../../../interfaces/categoryResponse.interface';
import { SharedModule } from '../../../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../../../dashboard/shared/confirmation/confirmation.component';


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
  private dialog = inject( MatDialog)
  private snackBar = inject( MatSnackBar );

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

  openCategoryDialog(){
    const dialogRef = this.dialog.open( NewCategoryComponent, {
      width: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

      if( result === 3 ) return;

      if( result === 2 ){
        this.openSnackBar("Error al Guardar Categoria", "Error")
        return;
      }

      this.openSnackBar("Categoria Agregada", "Exitosa")
      this.store.dispatch( loadCategories() )
    });
  }

  edit(category:Category){
    const { id, name, description} = category;

    const dialogRef = this.dialog.open( NewCategoryComponent, {
      data: { id, name, description},
      width: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if( result === 1) {
        this.openSnackBar("Categoria Actualizada", "Exitosa")
        this.store.dispatch( loadCategories() )
        return;
      };

      if( result === 2 ){
        this.openSnackBar("Error al Guardar Categoria", "Error")
        return;
      }
    });
  }

  delete(id: number){
    const dialogRef = this.dialog.open( ConfirmationComponent, {
      data: { id },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if( result === 1) {
        this.openSnackBar("Categoria Eliminada", "Exitosa")
        this.store.dispatch( loadCategories() )
        return;
      };

      if( result === 2 ){
        this.openSnackBar("Error al Eliminar Categoria", "Error")
        return;
      }
    });
  }

  private openSnackBar( msg: string, action: string ) {
    return this.snackBar.open( msg, action,{
      duration: 3000
    });
  }

}
