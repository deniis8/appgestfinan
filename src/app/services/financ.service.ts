import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../models/Lancamento';

@Injectable({
  providedIn: 'root'
})
export class FinancService {

  //Url Lançamentos
  private urlLanc = 'https://localhost:5001/api/lancamentos';//'https://apigerenfinan.herokuapp.com/lancamentos?_sort=id&_order=desc';

  private urlCCusto = 'https://localhost:5001/api/centrocustos';

  constructor(private http: HttpClient) { }

  //Lançamentos
  getLancamento(){
    return this.http.get(`${this.urlLanc}`);
  }
  public getLancamentoPorId(id: number){
    return this.http.get(`${this.urlLanc}/${id}`);
  }
  public postLancamento(lancamento: Lancamento){
    console.log(lancamento)
    return this.http.post(this.urlLanc, lancamento);
  }
  public putLancamento(lancamento: Lancamento){
    return this.http.put(`${this.urlLanc}/${lancamento.id}`, lancamento);
  }
  public deleteLancamento(id: number){
    //return this.http.delete(`${this.urlLanP}/${id}`);
    this.http.delete(`${this.urlLanc}/${id}`).subscribe(
      //resp => console.log('deleted'),
      //error => console.log('error occur, delete fail')
  );
  }

  //Centro de Custo
  getCCusto(){
    return this.http.get(`${this.urlCCusto}`);
  }

}
