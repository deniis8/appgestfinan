import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CentroCustoService {

  private urlCCusto = 'https://localhost:5001/api/centrocustos';

  constructor(private http: HttpClient) { }

  //Centro de Custo
  getCCusto(){
    return this.http.get(`${this.urlCCusto}`);
  }
}