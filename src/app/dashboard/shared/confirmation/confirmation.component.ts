import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { SharedModule } from '../../../shared/shared.module';
import { categoriesState } from '../../../store/categories/categories.reducer';
import { deleteCategories } from '../../../store/categories/categories.actions';
import { deleteProduct } from 'src/app/store/products/products.actions';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  public dialogRef = inject(MatDialogRef<ConfirmationComponent>);
  public data = inject(MAT_DIALOG_DATA);
  private store = inject(Store<categoriesState>)

  confirmDelete(){
    if ( this.data ){
      if ( this.data.category){
        this.store.dispatch( deleteCategories({id:this.data.category.id}))
        this.store.select('categories').subscribe( categories => {
          categories.error? this.dialogRef.close(2) : this.dialogRef.close(1)
        })
        return;
      }

      this.store.dispatch( deleteProduct({id:this.data.product.id}))
      this.store.select('products').subscribe( products => {
        products.error? this.dialogRef.close(1) : this.dialogRef.close(2)
      })
      return;
    }
    this.dialogRef.close(2)
  }

  onNoClick(){
    this.dialogRef.close(3)
  }

}

