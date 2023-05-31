import { Component, OnInit } from '@angular/core';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  addProductMessage: string | undefined
  details: string = ''

  constructor(private product: ProductService) { }

  ngOnInit(): void {
  }

  submit(data: product){
    this.product.addProduct(data).subscribe((result) => {
      // console.log('data: ', data)
      // console.log('result: ', result)
      if(result){
        this.addProductMessage = 'Product is successfully added'
      }
      setTimeout(() => this.addProductMessage = undefined, 3000)
    })
  }

}
 