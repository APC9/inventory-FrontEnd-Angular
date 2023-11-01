import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{

  categoryForm!: FormGroup;

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef<NewCategoryComponent>);

  ngOnInit(): void {
      this.categoryForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(4)] ],
        descripcion: ['', [Validators.required, Validators.minLength(4)] ],
      })
  }

  submit(){
    if( this.categoryForm.invalid )return;
    const { name, descripcion } = this.categoryForm.value;
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

  cancel(){
    this.dialogRef.close(3)
  }

}
