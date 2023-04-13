import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    
  validate!: boolean

  validatePassword(password: string) {
    password.length == 8 ? this.validate = true : this.validate = false;
    return this.validate
  }

  getUserName(){
    const name = window.localStorage.getItem('name')
    return name
  }

  getToken(){
    const token = window.localStorage.getItem('token')

    if(token) return true

    return false
  }

  getAdmin(){
    const admin = localStorage.getItem('admin');
    return admin == 'true'
  }
}
