import { Category } from './category.model';

export class Product{

  constructor(
    public id:       number,
    public name:     string,
    public price:    number,
    public account:  number,
    public category: Category,
    public picture:  string,
  ){}
}

