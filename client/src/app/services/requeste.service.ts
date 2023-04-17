import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RegisterTablesModel } from '../models/RegisterTablesModel';


@Injectable({
  providedIn: 'root'
})
export class RequesteService {

  private readonly apiUrl = environment.apiUrl;
  

  constructor(private  httpCliente: HttpClient) { }

  signinUser(payload: any){
    return this.httpCliente.post<any>(`${this.apiUrl}/signin`, payload);
  }

  signupUser(payload: any){
    return this.httpCliente.post<any>(`${this.apiUrl}/signup`, payload)
  }

  getTables(){
    return  this.httpCliente.get<any>(`${this.apiUrl}/tables`)
  }

  setTables(payload: any){
    return  this.httpCliente.post<any>(`${this.apiUrl}/tables`, payload)
  }

  delTables(id: number){
    return this.httpCliente.delete<any>(`${this.apiUrl}/tables/${id}`)
  }

  editTable(id: number, payload: any){
    return this.httpCliente.put<any>(`${this.apiUrl}/tables/${id}`, payload)
  }

  getTableById(id: number){
    return this.httpCliente.get<any>(`${this.apiUrl}/tables/${id}`)
  }

}
