import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined
  priceSummary: priceSummary ={
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  emptyMsg: string = ''

  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadDetails()
  }

  loadDetails(){
    this.emptyMsg = ''
    this.product.currentCart().subscribe((result) => {
      // console.log(result)
      this.cartData = result
      let price = 0;
      result.forEach((item) => {
        // console.log('item.price: ', item.price)
        // console.log(item.price)
        if(item.quantity){
          price = price + (+item.price * + item.quantity)
        }
      })
      // console.log('price: ', price)
      this.priceSummary.price = price
      this.priceSummary.discount = price/10
      this.priceSummary.tax = price/ 10
      this.priceSummary.delivery = 100
      // this.priceSummary.total = price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount
      this.priceSummary.total = price + (price/10) + 100 - (price/10)
      console.log(this.priceSummary)
      console.log('length: ', !this.cartData.length)
      if(!this.cartData.length){
        this.emptyMsg = 'Your Cart is empty'
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 4000)
      }
    })
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }

  removeFromCart(itemId: number | undefined){
    this.cartData && this.product.removeFromCart(itemId).subscribe((result) => {
      this.loadDetails()
    })
    // itemId && this.product.deleteCartItem(itemId)
    // console.log('cartData: ', this.cartData)
    // console.log('cartid: ', item)
  }

}
