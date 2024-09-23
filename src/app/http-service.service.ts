import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  localStorage = localStorage || null 
  constructor(private http: HttpClient) {}
  // url= 'https://cmplserv.onrender.com/'
  url='http://localhost:10000/'
  requestOptions = {
    headers: {
        Accept:'aplication/json',
        'Authorization': `${this.localStorage.getItem('token')}`||'null',
        'Content-Type': 'application/json' // Tipo de conteúdo do corpo da solicitação
    },
    credentials:'include',
    withCredentials: true
  };
  ConsultarDelivery(body:object):Observable<any>{
    return this.http.post<any>(this.url+'delivery',body,this.requestOptions)
  }
  ConsultarComanda(body:object):Observable<any>{
    return this.http.post<any>(this.url+'comanda',body,this.requestOptions)
  }
  ConsultarBalcao(body:object):Observable<any>{
    return this.http.post<any>(this.url+'balcao',body,this.requestOptions)
  }
  ConsultarGeral(body:object):Observable<any>{
    return this.http.post<any>(this.url+'geral',body,this.requestOptions)
  }
  ConsultarProduto():Observable<any>{
    return this.http.post<any>(this.url+'produtos',this.requestOptions)
  }
}
