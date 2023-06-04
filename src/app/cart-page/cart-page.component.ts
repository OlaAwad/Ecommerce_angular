import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary, product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  // cartData: cart[] | undefined
  cartData: any
  priceSummary: priceSummary ={
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  emptyMsg: string = ''
  checkoutDisabled: boolean = false

  constructor(private product: ProductService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadDetails()
    console.log('cartData: ', this.cartData)
  }

  loadDetails(){
    this.emptyMsg = ''
    let user = localStorage.getItem('user')
    if(user){
      this.product.currentCart().subscribe((result: cart[]) => {
        // console.log(result)
        this.cartData = result
        console.log('cartData: ', this.cartData)
        let price = 0;
        result.forEach((item) => {
          if(item.quantity && item.availableQuantity){
            price = price + (+item.price * + item.quantity);
          //  item.availableQuantity = item.availableQuantity - item.quantity
          //  console.log('aq: ', item.availableQuantity)
          //  console.log('q: ', item.quantity)
          }
        })
        // console.log('price: ', price)
        this.priceSummary.price = price
        this.priceSummary.discount = price/10
        this.priceSummary.tax = price/ 10
        this.priceSummary.delivery = 100
        this.priceSummary.total = price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount
        // this.priceSummary.total = price + (price/10) + 100 - (price/10)
        // console.log(this.priceSummary)
        // console.log('length: ', !this.cartData.length)
        if(!this.cartData.length){
          this.emptyMsg = 'Your Cart is empty'
          this.checkoutDisabled = !this.checkoutDisabled
          this.priceSummary.delivery = 0
          this.priceSummary.total = price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 4000)
        }
      })
    } else{
      let result = localStorage.getItem('localCart')
      this.cartData = result && JSON.parse(result)
      let price = 0;
      this.cartData && this.cartData.forEach((item: any) => {
        if(item.quantity){
          price = price + (+item.price * + item.quantity)
        }
      })
      this.priceSummary.price = price
      this.priceSummary.discount = price/10
      this.priceSummary.tax = price/ 10
      this.priceSummary.delivery = 100
      // this.priceSummary.total = price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount
      this.priceSummary.total = price + (price/10) + 100 - (price/10)
      // console.log(this.priceSummary)
      if(this.cartData && !this.cartData.length){
        this.emptyMsg = 'Your Cart is empty'
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 4000)
      }
    }
   
  }

  checkout(){
    console.log('cartData: ', this.cartData)
    let user = localStorage.getItem('user')
    if(user){
      this.product.currentCart().subscribe((result: cart[])=>{
        // console.log('result: ', result)
        result.forEach((item) => {
          if(item.availableQuantity && item.quantity){
            item.availableQuantity -= item.quantity
            // console.log('itemAQ: ', item.availableQuantity)
            // console.log('item: ', item)
            this.http.put<product[]>(`http://localhost:3000/products/${item.productId}`, item).subscribe(()=>{
              
            })
            // console.log('updated')
            // setTimeout(() => {
              // this.product.updateProduct(item)
              // console.log('item.aq: ', item.availableQuantity)
              // this.http.put<cart[]>(`http://localhost:3000/products/${item.productId}`, item)
            // }, 5000)
           
          }
        })
      })
      // if(this.cartData){
      //   this.product.saveOrderDetails(this.cartData).subscribe((result) => {
      //     console.log(result)
      //   })
      // }
      if(this.cartData){
        this.sendCartDetails(this.cartData)
      this.sendTotalPrice(this.priceSummary.total)
      }
      this.router.navigate(['/checkout'])
    }else{
      this.router.navigate(['/user-auth'])
    }
  }

  removeFromCart(itemId: number | undefined){
    this.cartData && this.product.removeFromCart(itemId).subscribe((result) => {
      // console.log('result: ', result)
      this.loadDetails()
    })
  }

  sendCartDetails(data: cart[]){
    this.product.sendCartData(data)
  }

  handleQuantity(val: string, cart: product){
    // console.log('q: ', cart.quantity)
     if(val === 'plus' ){
      cart.quantity += 1
     } else if(val === 'min'){
      cart.quantity -= 1
     }
    //  console.log('q: ', cart.quantity)
      let price = 0
      this.cartData && this.cartData.forEach((item: any) => {
        if(item.quantity){
          price = price + (+item.price * + item.quantity)
        }
      })
      this.priceSummary.price = price
      this.priceSummary.discount = price/10
      this.priceSummary.tax = price/ 10
      this.priceSummary.delivery = 100
      this.priceSummary.total = price + (price/10) + 100 - (price/10)

      if(this.cartData){
        this.sendCartDetails(this.cartData)
      }
      // let user = localStorage.getItem('user')
      // if(user){
      //   this.product.currentCart().subscribe((result: cart[]) => {
      //     result.forEach((item) => {
      //       this.http.put<product[]>
      //     })
      //   })
      // }

      this.sendTotalPrice(this.priceSummary.total)

      console.log('total: ', this.priceSummary.price)
      console.log('cartData: ', this.cartData)
  }

  sendTotalPrice(data: number){
    this.product.sendTotalPrice(data)
  }

}
