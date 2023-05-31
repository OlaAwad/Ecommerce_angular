import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "./services/user.service";

@Injectable({
    providedIn: 'root'
  })

export class UserGuard implements CanActivate{
    constructor(private userService: UserService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        if(localStorage.getItem('user')){
            return true
        }
        return this.userService.invalidUserAuth
    }
}