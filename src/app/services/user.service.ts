import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp, user } from '../data-types';
import { BehaviorSubject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false)

  userData = localStorage.getItem('user')
  private userInfo: BehaviorSubject<user> = new BehaviorSubject<user>(this.userData && JSON.parse(this.userData))
  info: Observable<user> = this.userInfo.asObservable()

  constructor( private http: HttpClient, private router: Router ) { }

  userSignUp(user: SignUp){
    // console.log(user)
    this.http.post(`http://localhost:3000/users`, user, {observe: 'response'}).subscribe((result) => {
      console.log(result)
      if(result){
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
  }


  userLogin(data: Login){
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe:'response'}).subscribe((result) => {
      if(result && result.body?.length){
        // console.log(result)
        this.invalidUserAuth.emit(false)
        localStorage.setItem('user', JSON.stringify(result.body[0]))
        this.router.navigate(['/'])
      }else{
        this.invalidUserAuth.emit(true)
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }



  updateUserInfo(data: user){
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    // console.log('userId: ', userId)
    return this.http.put<user>(`http://localhost:3000/users/${userId}`, data)
  }

  sendUserInfo(data: user){
    this.userInfo.next(data)
  }
}
