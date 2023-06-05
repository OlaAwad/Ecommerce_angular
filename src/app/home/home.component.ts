import { Component, OnInit } from '@angular/core';
import { cart, categories, product } from '../data-types';
import { ProductService } from '../services/product.service';
import * as Aos from 'aos';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  popularProducts: undefined | product[]
  trendyProducts: undefined | product[]
  categories: undefined | categories[]
  categoryResult: undefined | product[]
  productData: undefined | product
  // removeCart: boolean = false
  cartData: product | undefined
  productQuantity: number = 1
  addToCartFlag: boolean = true
  cartDetails: product[] | undefined

  constructor(private product: ProductService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      // console.log(data)
      this.popularProducts = data;
    })

    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data
    })

    this.categories = [{name: 'Mobiles', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=329&q=80'}, {name: 'Laptops', image: 'https://plus.unsplash.com/premium_photo-1681286768130-b9da2bdc6695?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'}, {name: 'Shoes', image:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'}]
    
    // this.addToCartFlag = this.product.getFlagValue()
    // console.log('flag: ', this.product.getFlagValue())
    Aos.init();

    // this.product.currentCart().subscribe((result: any) =>{
    //   console.log('result: ', result)
    //   this.cartDetails = result
    // })

   
  }

  displayCatProducts(val: string){
    // console.log(val)
    this.product.categoryProducts(val).subscribe((result) => {
      this.categoryResult = result
      this.sendCategoryProducts(this.categoryResult)
    })
    this.router.navigate([`category-products/${val}`])
  }

  sendCategoryProducts(data:product[]){
    this.product.sendCategoryProducts(data)
  }

  addToCart(item: product){
    // console.log('item: ', item)
    setTimeout(()=>{
      this.product.currentCart().subscribe((result: any)=>{
        // console.log(result)
        this.cartDetails = result
      })
    },500)

    // this.checkIfItemInCart()
    console.log('details: ', this.cartDetails)

    this.cartDetails && this.cartDetails.forEach((prd: any) => {
      if(item.id == prd.productId){
        console.log('exists')
        prd.quantity += item.quantity
        
      }else{
      }
    });

    // this.product.getCartList(1)
    // console.log(this.product.getCartList(1))
    item.quantity = this.productQuantity
    if(!localStorage.getItem('user')){
      this.product.localAddToCart(item)
      // this.removeCart = true
    } else{
      let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id
    

      let cartData: cart = {
        ...item,
        userId,
        productId: item.id
      }
      // console.log('cartData: ', cartData)
      delete cartData.id
      this.product.addToCart(cartData).subscribe((result) => {
        if(result){
          // console.log('result: ', result)
          this.product.getCartList(userId)
          // this.removeCart = true
        }
      })
    }
    
    
  }
  

  // removeFromCart(productId: number){
  //   if(!localStorage.getItem('user')){
  //     this.product.removeItemFromCart(productId)
  //   } else{
  //     let user = localStorage.getItem('user')
  //     let userId = user && JSON.parse(user).id
  //     this.cartData && this.product.removeFromCart(this.cartData.id).subscribe((result) => {
  //       if(result){
  //         this.product.getCartList(userId)
  //       }
  //     })
  //   }
  
  // }

  checkIfItemInCart(){
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=${userId}`, {observe: 'response'}).subscribe((result)=>{
      if(result && result.body){
        // console.log('cartDetails: ', result.body)
        this.cartDetails = result.body
      }
      
    })
  }



  
}
