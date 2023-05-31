import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | product
  updateProductMessage: undefined | string
  details: string = ''

  constructor( private route: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    console.log(productId)
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.log(data)
      this.productData = data
    })
  }

  submit(data: product){
    console.log(data)
    if(this.productData){
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((result) => {
      if(result){
        this.updateProductMessage = 'Product is successfully updated'
      }
    })
    setTimeout(() => {
      this.updateProductMessage = undefined
    }, 3000)
  }

}
