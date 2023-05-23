import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private searchResult: BehaviorSubject<product[]> = new BehaviorSubject<product[]>([]);
  searResult: Observable<product[]> = this.searchResult.asObservable()

  constructor(private http: HttpClient) { }

  addProduct(data: product){
    // console.log('service called')
    return this.http.post('http://localhost:3000/products', data)
  }

  productList(){
    return this.http.get<product[]>('http://localhost:3000/products')
  }

  deleteProduct(id: number){
    return this.http.delete<product[]>(`http://localhost:3000/products/${id}`)
  }

  getProduct(id: string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product: product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product)
  }

  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3')
  }

  trendyProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8')
  }

  searchProducts(query: string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  sendSearchResult(searResult: product[]){
    this.searchResult.next(searResult)
  }
}
