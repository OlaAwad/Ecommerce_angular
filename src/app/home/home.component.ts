import { Component, OnInit } from '@angular/core';
import { categories, product } from '../data-types';
import { ProductService } from '../services/product.service';
import * as Aos from 'aos';
import { Router } from '@angular/router';

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


  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      // console.log(data)
      this.popularProducts = data;
    })

    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data
    })

    this.categories = [{name: 'Mobiles', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=329&q=80'}, {name: 'Laptops', image: 'https://plus.unsplash.com/premium_photo-1681286768130-b9da2bdc6695?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'}, {name: 'Shoes', image:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'}]
    
    Aos.init();

   
  }

  displayCatProducts(val: string){
    console.log(val)
    this.product.categoryProducts(val).subscribe((result) => {
      this.categoryResult = result
      this.sendCategoryProducts(this.categoryResult)
    })
    this.router.navigate([`category-products/${val}`])
  }

  sendCategoryProducts(data:product[]){
    this.product.sendCategoryProducts(data)
  }

}
