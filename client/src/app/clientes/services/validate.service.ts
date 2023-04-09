import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ValidateService {
    
  validate!: boolean

  validatePassword(password: string) {
    password.length == 8 ? this.validate = true : this.validate = false;
    return this.validate
  }

  
}
