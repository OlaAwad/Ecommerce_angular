import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default'
  sellerName: string = ''
  searchResult: undefined | product[]
  userName: string = ''
  cartItems = 0;

  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any)=> {
      if(val.url){
        // console.log(val.url)
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          // console.log('In seller area')
          this.menuType = 'seller'
          let sellerStore = localStorage.getItem('seller')
          let sellerData = sellerStore && JSON.parse(sellerStore)[0]
          this.sellerName = sellerData.name
          console.log('name: ', this.sellerName)
        }else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          // console.log('userdata: ', userData)
          this.userName = userData.name
          this.menuType = 'user'
        }else{
          // console.log('outside seller area')
          this.menuType = 'default'
        }
      }
    })

    let cartData = localStorage.getItem('localCart')
    if(cartData){
      // console.log('cartData: ', JSON.parse(cartData).length)
      this.cartItems = JSON.parse(cartData).length
    }

    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length
    })
  }

  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }

  userLogout(){
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
  }

  searchProduct(query: KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement
      // console.log('element: ', element.value)
      this.product.searchProducts(element.value).subscribe((result)=>{
        // console.log('query: ', element.value)
        // console.log(result)
        if(result.length > 5){
          result.length = 5
        }
        this.searchResult = result
        // console.log('search result: ', this.searchResult)
        this.sendSearchResult(this.searchResult)
      })
    }
  }

  hideSearch(){
    this.searchResult = undefined
  }

  submitSearch(val: string){
    console.log(val)
    this.route.navigate([`search/${val}`])
  }

  sendSearchResult(data: product[]){
    this.product.sendSearchResult(data)
  }

  redirectToDetails(id: number){
    console.log(id)
    this.route.navigate([`/details/${id}`])
  } 

 

}
