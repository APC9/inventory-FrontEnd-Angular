import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { SharedModule } from '../../../shared/shared.module';
import { categoriesState } from '../../../store/categories/categories.reducer';
import { deleteCategories } from '../../../store/categories/categories.actions';

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
      this.store.dispatch( deleteCategories(this.data))
      this.store.select('categories').subscribe( categories => {
        categories.error? this.dialogRef.close(2) : this.dialogRef.close(1)
      })
      return;
    }
    this.dialogRef.close(2)
  }

  onNoClick(){
    this.dialogRef.close(3)
  }

}

