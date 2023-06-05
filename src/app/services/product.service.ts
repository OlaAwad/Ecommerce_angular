import { HttpClient } from '@angular/common/http'
import { EventEmitter, Injectable } from '@angular/core'
import { cart, order, product } from '../data-types'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>()

  private searchResult: BehaviorSubject<product[]> = new BehaviorSubject<
    product[]
  >([])
  searResult: Observable<product[]> = this.searchResult.asObservable()

  private categoryResult: BehaviorSubject<product[]> = new BehaviorSubject<product[]>([])
  catResult: Observable<product[]> = this.categoryResult.asObservable() 

  private cartDetails: BehaviorSubject<cart[]> = new BehaviorSubject<cart[]>([])
  cart: Observable<cart[]> = this.cartDetails.asObservable()

  private orderDetails: BehaviorSubject<any> = new BehaviorSubject<any>({})
  ordDetails: Observable<any> = this.orderDetails.asObservable()

  private totalCartPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  totalPrice: Observable<number> = this.totalCartPrice.asObservable()


  constructor(private http: HttpClient) {}

  addProduct(data: product) {
    // console.log('service called')
    return this.http.post('http://localhost:3000/products', data)
  }

  productList() {
    return this.http.get<product[]>('http://localhost:3000/products')
  }

  deleteProduct(id: number) {
    return this.http.delete<product[]>(`http://localhost:3000/products/${id}`)
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product: product) {
    // console.log('aQuantity: ', product.availableQuantity)
    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product,
    )
  }
  

  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3')
  }

  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8')
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  sendSearchResult(searResult: product[]) {
    this.searchResult.next(searResult)
  }

  localAddToCart(data: product) {
    // console.log('data: ', data)
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.cartData.emit([data])
    } else {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      let items: product[] = JSON.parse(cartData)
      items = items.filter((item: product) => productId !== item.id)
      console.log('items: ',items)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items)
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData)
  }

  getCartList(userId: number) {
    // console.log('userId: ', userId)
    return this.http
      .get<product[]>(`http://localhost:3000/cart?userId=${userId}`, {observe: 'response'}).subscribe((result) => {
        // console.log('getCartListResult: ',result)
        if (result && result.body) {
          this.cartData.emit(result.body)
          // console.log('cartData: ', result.body)
        }
      })
  }

  removeFromCart(cartId: number | undefined){
    console.log('cartId: ', cartId)
    return this.http.delete(`http://localhost:3000/cart/${cartId}`)
  }

  currentCart(){
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
    if(userData){
      return this.http.get<cart[]>(`http://localhost:3000/cart?userId=${userData.id}`)
    }else{
      let cartData = localStorage.getItem('localCart')
      return cartData && JSON.parse(cartData)
    }
    
  }

  orderNow(data: order){
    return this.http.post(`http://localhost:3000/orders`, data)
  }

  orderList(){
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<order[]>(`http://localhost:3000/orders?userId=${userData.id}`)
  }

  deleteCartItem(cartId: number){
    return this.http.delete(`http://localhost:3000/cart/${cartId}`, {observe:'response'}).subscribe((result) => {
      if(result){
        console.log('result: ', result)
        this.cartData.emit([])
        console.log('this.cartData: ', this.cartData )
      }
    })
  }

  cancelOrder(orderId: number){
    return this.http.delete(`http://localhost:3000/orders/${orderId}`)
  }

  categoryProducts(query: string){
    return this.http.get<product[]>(`http://localhost:3000/products?category=${query}`)
  }

  sendCategoryProducts(catResult: product[]){
    this.categoryResult.next(catResult)
  }


  // postPrdImages(images: any){
  //   return this.http.post(`http://localhost:3000/prdImages`, images)
  // }

  sendCartData(data: cart[]){
    this.cartDetails.next(data)
  }

  // saveOrderDetails(cartData: cart[]){
  //   return this.http.post(`http://localhost:3000/orders`, cartData)
  // }

  sendOrderDetails(details: {}){
    this.orderDetails.next(details)
  }

  getOrderDetails(orderId: string){
    return this.http.get(`http://localhost:3000/orders/${orderId}`)
  }

  sendTotalPrice(data: number){
    this.totalCartPrice.next(data)
  }


  
}