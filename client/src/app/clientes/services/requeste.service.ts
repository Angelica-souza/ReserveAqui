import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RequesteService {

  private readonly apiUrl = environment.apiUrl;
  

  constructor(private  httpCliente: HttpClient) { }

  signinUser(payload: any){
    return this.httpCliente.post<any>(`${this.apiUrl}/signin`, payload);
    
  console.log(this.apiUrl);
  }

  signupUser(payload: any){
    return this.httpCliente.post<any>(`${this.apiUrl}/signup`, payload)
  }
}
