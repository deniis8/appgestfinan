import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CentroCustoService {

  private urlCCusto = 'http://192.168.0.109:5000/api/centrocustos';

  constructor(private http: HttpClient) { }

  //Centro de Custo
  getCCusto() {
    return this.http.get(`${this.urlCCusto}`);
  }
}