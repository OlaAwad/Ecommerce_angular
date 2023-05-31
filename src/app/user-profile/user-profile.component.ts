import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { user } from '../data-types';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userName: string = ''
  userEmail: string = ''
  userMobile: string = ''
  userId: number = 0
  defaultAddress: string = ''
  secondAddress: string = ''
  addNewAddress: boolean = false
  userData: user = {name:'', email:'', mobile:'01231231', defaultAddress: '', secondAddress: '', id:0}
  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    let user = localStorage.getItem('user')
    this.userData = user && JSON.parse(user)
    console.log('userData: ', this.userData)
    this.userName = this.userData.name
    this.userEmail = this.userData.email
    this.userMobile = this.userData.mobile
    // this.defaultAddress = this.userData.defaultAddress
    this.defaultAddress = this.userData.defaultAddress
    this.secondAddress = this.userData.secondAddress
    this.userId = this.userData.id
  }
  submit(data: user){
    console.log('userData: ', this.userData)
    console.log('data: ', data)
   this.userService.updateUserInfo(data).subscribe((result) => {
    console.log('result: ', result)   
    localStorage.setItem('user', JSON.stringify(result)) 
    // this.userService.updateUserInfo(result)
   this.sendUserInfoToHeader(result)
   })
  }

  sendUserInfoToHeader(data: user){
    console.log('data sent: ', data)
    this.userService.sendUserInfo(data)
  }

  // addAddress(){
  //   this.addNewAddress = true
  // }

  // addAddresses(addresses: any){
  //   this.defaultAddress = addresses.defaultAddress
  //   this.secondAddress = addresses.secondAddress
  //   this.userService.updateUserInfo(addresses).subscribe((result) => {
  //     // localStorage.setItem('user', JSON.stringify(result))
  //     this.mergeLocalStorage(result)
  //   })
  // }

  // mergeLocalStorage(obj: any){
  //   let user = localStorage.getItem('user')
  //   let userId = user && JSON.parse(user).id
  //   let newObj = user && JSON.parse(user)
  //   for(var k in obj){
  //     newObj[k] = obj[k]
  //   }
  //   localStorage.setItem('user', JSON.stringify(newObj))
  //   // return newObj
  //   console.log('newObj: ', newObj)
  //   return this.http.put<user>(`http://localhost:3000/users/${userId}`, newObj)
  // }

  // mergeDatainDB(userInfo: any, addresses: any){
  //   let user = localStorage.getItem('user')
  //   let userId = user && JSON.parse(user).id
  //   let newObj = user && JSON.parse(user)
  //   for (let i in userInfo){
  //     newObj[i] = userInfo[i]
  //   }
  //   return
  // }
  

}
