import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order, product } from '../data-types';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined
  cartData: cart[] | undefined
  orderMsg: string | undefined
  userEmail: string = ''
  userAddress: string = ''
  userContact: string = ''
  cartDetails: any | undefined
  productName: string = ''
  productImage: string = ''
  productQuantity: number = 1

  constructor(private product: ProductService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.product.totalPrice.subscribe((result) => {
      // console.log('price: ', result)
      this.totalPrice = result
    })
    // this.product.currentCart().subscribe((result: cart[]) => {
    //   let price = 0;
    //   this.cartData = result
    //   result.forEach((item) => {
    //     if(item.quantity){
    //       price = price + (+item.price * + item.quantity)
    //     }
    //   })
    //   this.totalPrice = price + (price/10) + 100 - (price/10)
    //   console.log(this.totalPrice)
    // })

    this.getUserInfo()
    this.getCartDetails()
    // this.getTotalPrice()
  }

  orderNow(data: {email: string, address: string, contact: string}){
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    if(this.totalPrice && this.cartDetails){
      this.cartDetails.forEach((item: any)  => {
        this.productName = item.name
        this.productImage =item.images
        this.productQuantity= item.quantity
      });
      let orderData: any = {
        ...data,
        items:[...this.cartDetails],
        totalPrice: this.totalPrice,
        userId,        
        id: undefined
      }
      // console.log('orderData: ', orderData)
      this.sendOrderData(orderData.items)
      // this.product.localAddToCart(orderData.items)
      localStorage.setItem('localCart', JSON.stringify([]))

     

      this.cartDetails?.forEach((item: product) => {
        console.log('item: ', item)
        setTimeout(()=>{
          item.id && this.product.deleteCartItem(item.id)
        }, 600)
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if(result){
          // alert('Order Placed')
          this.orderMsg = 'Your order has been placed'
          setTimeout(() => {
          this.product.updateCartCount()
            this.router.navigate(['/my-orders'])
            this.orderMsg = undefined
          }, 4000)
        }
      })
    }
  }

  getUserInfo(){
    this.userService.info.subscribe((res) => {
      this.userEmail = res.email
      this.userAddress = res.defaultAddress
      this.userContact = res.mobile
    })
    return this.userEmail, this.userAddress, this.userContact
  }

  getCartDetails(){
    this.product.cart.subscribe((result) => {
      // console.log('result: ', result[0].image)
      this.cartDetails = result
      // console.log('cartDetails: ', this.cartDetails)
    })
  }

  sendOrderData(details: {}){
    this.product.sendOrderDetails(details)
    //get by orderData.id

  }

  // getTotalPrice(){
  //   this.product.totalPrice.subscribe((result) => {
  //     console.log('price: ', result)
  //     this.totalPrice = result
  //   })
  // }

}
