import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { product } from '../data-types'
import { ProductService } from '../services/product.service'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default'
  sellerName: string = ''
  searchResult: undefined | product[]
  userName: string = ''
  cartItems = 0

  constructor(private router: Router, private product: ProductService, private userService: UserService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        // console.log(val.url)
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.log('In seller area')
          this.menuType = 'seller'
          let sellerStore = localStorage.getItem('seller')
          let sellerData = sellerStore && JSON.parse(sellerStore)[0]
          this.sellerName = sellerData.name
          // console.log('name: ', this.sellerName)
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          // console.log('userdata: ', userData)
          // this.userName = userData.name
          this.userName = this.getUserName()
          this.menuType = 'user'
          this.product.getCartList(userData.id)
        } else {
          // console.log('outside seller area')
          this.menuType = 'default'
          // this.product.getCartList(null)
        }
      }
    })

    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      // console.log('cartData: ', JSON.parse(cartData).length)
      this.cartItems = JSON.parse(cartData).length
    }

    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length
    })
  }

  logout() {
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }

  userLogout() {
    localStorage.removeItem('user')
    this.router.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      // console.log('element: ', element.value)
      this.product.searchProducts(element.value).subscribe((result) => {
        // console.log('query: ', element.value)
        // console.log(result)
        if (result.length > 5) {
          result.length = 5
        }
        this.searchResult = result
        // console.log('search result: ', this.searchResult)
        this.sendSearchResult(this.searchResult)
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined
  }

  submitSearch(val: string) {
    // console.log(val)
    this.router.navigate([`search/${val}`])
  }

  sendSearchResult(data: product[]) {
    this.product.sendSearchResult(data)
  }

  redirectToDetails(id: number) {
    // console.log(id)
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false
    }
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([`/details/${id}`])
  }

  getUserName(){
    this.userService.info.subscribe((res) =>{
      this.userName = res.name
    })
    return this.userName
  }
}
