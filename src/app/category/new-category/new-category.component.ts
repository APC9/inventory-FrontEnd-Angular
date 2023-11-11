import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { categoriesState } from '../../store/categories/categories.reducer';
import { updateCategories } from '../../store/categories/categories.actions';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { SharedModule } from '../../shared/shared.module';


@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{

  categoryForm!: FormGroup;
  dialogData = inject(MAT_DIALOG_DATA); // Esta informacion viene de categoryComponent - metodo edit

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef<NewCategoryComponent>);
  private store = inject( Store<categoriesState>);

  ngOnInit(): void {
      this.categoryForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(4)] ],
        descripcion: ['', [Validators.required, Validators.minLength(4)] ],
      })

      if( this.dialogData ){
        this.updateForm( this.dialogData )
      }
  }

  updateForm(data: Category){
    this.categoryForm.get('name')?.setValue(data.name)
    this.categoryForm.get('descripcion')?.setValue(data.description)
  }

  submit(){
    if( this.categoryForm.invalid )return;
    const { name, descripcion } = this.categoryForm.value;
    const updateCategory: Category = {
      name,
      description: descripcion,
      id: this.dialogData.id
    }

    if ( this.dialogData){
      this.store.dispatch( updateCategories({category: updateCategory}))
      this.dialogRef.close(1)
      return;
    }

    this.createCatagory(name, descripcion)
  }


  cancel(){
    this.dialogRef.close(3)
  }

  private createCatagory(name: string, descripcion: string){
    this.categoryService.createCategory(name, descripcion)
    .subscribe({
      next: resp =>{
        this.dialogRef.close(1)
      },
      error: err =>{
        console.log(err)
        this.dialogRef.close(2)
      }
    })
  }


}
