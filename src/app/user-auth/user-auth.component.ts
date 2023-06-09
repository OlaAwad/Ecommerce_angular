import { Component, OnInit } from '@angular/core'
import { cart, Login, product, SignUp } from '../data-types'
import { ProductService } from '../services/product.service'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true
  authError: string = ''

  constructor(private user: UserService, private product: ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReload()
  }

  signUp(data: SignUp) {
    // console.log(data)
    this.user.userSignUp(data)
  }

  login(data: Login) {
    // console.log(data)
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      // console.log('InvalidUserAuth: ', result)
      if (result) {
        this.authError = 'User not Found'
      } else {
        setTimeout(()=>{
          this.localCartToRemoteCart()
        }, 500)
      }
    })
    // let usr = localStorage.getItem('user')
    // let user = usr && JSON.parse(usr)
    // this.user.setUser(user)
    setTimeout(()=>{
      this.product.updateCartCount()
    }, 500)
  }

  openSignup() {
    this.showLogin = false
  }

  openLogin() {
    this.showLogin = true
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart')
    console.log('data: ',data && JSON.parse(data))
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    // console.log( 'user: ', user)
    // console.log('userId: ', userId)
    if (data) {
      let cartDataList = JSON.parse(data)
      cartDataList.forEach((product: product, index: number) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        }

        delete cartData.id
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              // console.log('item is stored in DB')
            }
          })
        }, 500)
        // if (cartDataList.length === index + 1) {
        //   localStorage.removeItem('localCart')
        // }
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000)
  }
}
