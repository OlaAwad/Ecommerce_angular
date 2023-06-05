import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { product } from '../data-types'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: any = []
  totalPrice: number = 0

  constructor(
    private product: ProductService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // this.getOrderDetails()
    let orderId = this.activeRoute.snapshot.paramMap.get('orderId')

    orderId &&
      this.product.getOrderDetails(orderId).subscribe((result: any) => {
        console.log('result: ', result)
        console.log('items: ', result.items)
        this.totalPrice = result.totalPrice
        const myArray = Object.values(result.items)
        this.orderDetails = myArray
        console.log('myArray: ', myArray)
      })
  }

  // getOrderDetails(){
  //   this.product.ordDetails.subscribe((result) => {
  //     console.log('result: ', result)
  //     let myArray = Object.keys(result).map(key => ({
  //       key, value: result[key]
  //     }))
  //     console.log('myArray: ', myArray)
  //    this.orderDetails = myArray
  //   })
  // }
}
