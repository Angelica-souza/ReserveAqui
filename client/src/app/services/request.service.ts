import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableReservesModel } from '../models/TableReservesModel';
import { ReserveTableModel } from 'src/app/models/ReserveTableModel';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly apiUrl = environment.apiUrl;
  

  constructor(private  httpCliente: HttpClient) { }

  signinUser(payload: any){
    return this.httpCliente.post<any>(`${this.apiUrl}/signin`, payload);
  }

  signupUser(payload: any){
    return this.httpCliente.post<any>(`${this.apiUrl}/signup`, payload)
  }

  getTables(){
    return this.httpCliente.get<any>(`${this.apiUrl}/tables`)
  }

  getTablesWithReserves(capacity: number){
    return this.httpCliente.get<TableReservesModel[]>(`${this.apiUrl}/tables?_embed=reserves&capacity=${capacity}`)
  }

  getReservesWithTableByUser(userId: number){
    return this.httpCliente.get<ReserveTableModel[]>(`${this.apiUrl}/reserves`, {
      params: {
        '_expand': 'table',
        userId
      }
    })
  }

  setTables(payload: any){
    return  this.httpCliente.post<any>(`${this.apiUrl}/tables`, payload)
  }


  setReserve(payload: any){
    return  this.httpCliente.post<any>(`${this.apiUrl}/reserves`, payload)
  }

  delTables(id: number){
    return this.httpCliente.delete<any>(`${this.apiUrl}/tables/${id}`)
  }
  
  delReserve(id: number){
    return this.httpCliente.delete<any>(`${this.apiUrl}/reserves/${id}`)
  }

  editTable(id: number, payload: any){
    return this.httpCliente.put<any>(`${this.apiUrl}/tables/${id}`, payload)
  }

  getTableById(id: number){
    return this.httpCliente.get<any>(`${this.apiUrl}/tables/${id}`)
  }

}
