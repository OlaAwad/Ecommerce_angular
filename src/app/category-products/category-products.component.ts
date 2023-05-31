import { Component, OnInit } from '@angular/core';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  constructor(private product: ProductService) { }

  products: product[] = []

  ngOnInit(): void {
      this.getCategoryResult()
  }

  getCategoryResult(){
    this.product.catResult.subscribe((res)=>{
      console.log('res: ', res)
      this.products = res
    })
  }

}
