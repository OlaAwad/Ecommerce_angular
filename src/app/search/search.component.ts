import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products: product[] = []
  
  constructor(private product: ProductService){}

  ngOnInit(): void {
 
    this.getSearchResult()
  }

  getSearchResult(){
    this.product.searResult.subscribe((res) => {
      // console.log('res: ', res)
      this.products = res
    })
  }

}
