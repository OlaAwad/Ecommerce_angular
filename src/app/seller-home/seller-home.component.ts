import { Component, OnInit } from '@angular/core';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | product[]
  deleteProductMessage: undefined | string

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.getProductList()
  }

  deleteProduct(id: number){
    // console.log('id: ', id)
    this.product.deleteProduct(id).subscribe((result) => {
      if(result){
        this.deleteProductMessage = 'Product is deleted'
        setTimeout(()=>{
        this.getProductList()
        
        }, 3000)
      }
    })
    setTimeout(() => {
      this.deleteProductMessage = undefined
    }, 3000)
  }
  
  getProductList(){
    this.product.productList().subscribe((result)=>{
      console.log(result)
      this.productList = result
    })
  }

}
