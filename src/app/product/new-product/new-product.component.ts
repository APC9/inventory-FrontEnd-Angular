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
import { Product } from '../../models/product.model';
import { updateProduct } from 'src/app/store/products/products.actions';


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

    if( this.dialogData ){
      this.updateForm( this.dialogData )
    }
  }


  submit(){
    if( this.productForm.invalid ) return;

    if ( this.dialogData ){
      const updateNewProduct = {
        ...this.productForm.value,
        id: this.dialogData.id,
        picture: this.selectedfile
      }
      this.store.dispatch( updateProduct({product: updateNewProduct, file: this.selectedfile }))
      this.dialogRef.close(1)
      return;
    }

    this.createProduct()
  }

  cancel(){
    this.dialogRef.close(3)
  }

  private createProduct(){
    this.productService.createProduct( this.productForm.value, this.selectedfile )
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


  updateForm(data: Product){
    this.productForm.get('name')?.setValue(data.name)
    this.productForm.get('price')?.setValue(data.price)
    this.productForm.get('account')?.setValue(data.account)
    this.productForm.get('category')?.setValue(data.category.id)
    this.productForm.get('picture')?.setValue(this.selectedfile)
  }

  onFileChanged(event: any){
    this.selectedImage = event.target.files[0].name;
    this.selectedfile = event.target.files[0];
  }


}
