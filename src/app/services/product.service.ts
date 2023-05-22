import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

  getProduct(id: String){
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
}
