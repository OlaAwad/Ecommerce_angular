import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { cart, product } from '../data-types'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product
  productQuantity: number = 1
  removeCart = false
  cartData: product | undefined

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId')
    // console.log(productId)
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        // console.log('result', result)
        this.productData = result
        // console.log('productData: ', this.productData)

        let cartData = localStorage.getItem('localCart')
        // console.log('cartData: ', cartData)
        if (productId && cartData) {
          let items = JSON.parse(cartData)
          items = items.filter(
            (item: product) => {
              productId == item.id?.toString()
              console.log('productId: ', productId)
            }
            
          )
          if (items.length) {
            this.removeCart = true
          } else {
            this.removeCart = false
          }
        }
        let user = localStorage.getItem('user')
        if (user) {
          let userId = user && JSON.parse(user).id
          this.product.getCartList(userId)
          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: product) =>
                productId?.toString() === item.id?.toString(),
                // productId?.toString() === item.productId?.toString(),
            )
            // console.log('productId: ', productId)
            // console.log('item: ', item)
            if (item.length) {
              this.cartData = item[0]
              this.removeCart = true
            }
          })
        }
      })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity
      if (!localStorage.getItem('user')) {
        console.log('productData: ',this.productData)
        this.product.localAddToCart(this.productData)
        this.removeCart = true
      } else {
        // console.log('user is logged in')
        // console.log('productData: ',this.productData)
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        // console.log(userId)
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        }
        delete cartData.id
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            // alert('Product is added in cart')
            this.product.getCartList(userId)
            this.removeCart = true
          }
        })
      }
    }
  }

  removeFromCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId)
    } else {
      let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id
      // console.log('cartData: ', this.cartData)
      this.cartData &&
        this.product.removeFromCart(this.cartData.id).subscribe((result) => {
          if (result) {
            // console.log('result: ', result)
            this.product.getCartList(userId)
          }
        })
    }
    this.removeCart = false
  }
}
