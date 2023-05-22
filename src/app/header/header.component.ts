import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default'
  sellerName: string = ''

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any)=> {
      if(val.url){
        // console.log(val.url)
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          console.log('In seller area')
          this.menuType = 'seller'
          let sellerStore = localStorage.getItem('seller')
          let sellerData = sellerStore && JSON.parse(sellerStore)[0]
          this.sellerName = sellerData.name
          console.log('name: ', this.sellerName)
        }else{
          console.log('outside seller area')
          this.menuType = 'default'
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }

}
