import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { NewCategoryComponent } from '../../category/new-category/new-category.component';
import { categoriesState } from '../../store/categories/categories.reducer';
import { ProductService } from '../../services/product.service';
import { SharedModule } from '../../shared/shared.module';
import { Category } from '../../models/category.model';


@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productForm!: FormGroup;
  dialogData = inject(MAT_DIALOG_DATA); // Esta informacion viene de categoryComponent - metodo edit
  categories: Category[] = [];
  selectedImage: string = "";
  selectedfile: any;

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<NewCategoryComponent>);
  private store = inject( Store<categoriesState>);
  private productService = inject(ProductService);


  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)] ],
      price: ['', [Validators.required, Validators.minLength(1)] ],
      account: ['', [Validators.required, Validators.minLength(1)] ],
      category: ['', [Validators.required, Validators.minLength(4)] ],
      picture: ['', [Validators.required] ],
    })

    this.store.select('categories').subscribe( ({categories}) => this.categories = categories)
  }


  submit(){
    if( this.productForm.invalid ) return;
    console.log(this.productForm.value)

    this.createProduct()
  }

  cancel(){
    this.dialogRef.close(3)
  }

  private createProduct(){

    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      categoryId: this.productForm.get('category')?.value,
      picture: this.selectedfile
    }

    // FormData que sera enviada en el metodo crear el product
    const sendData = new FormData()
    sendData.append('picture', data.picture, data.picture.name)
    sendData.append('name', data.name)
    sendData.append('price', data.price)
    sendData.append('account', data.account)
    sendData.append('categoryId', data.categoryId)

    this.productService.createProduct( sendData )
    .subscribe({
      next: () =>{
        this.dialogRef.close(1)
      },
      error: err =>{
        console.log(err)
        this.dialogRef.close(2)
      }
    })
  }

  onFileChanged(event: any){
    this.selectedImage = event.target.files[0].name;
    this.selectedfile = event.target.files[0];
  }
}
