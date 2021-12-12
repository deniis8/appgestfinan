import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../models/Lancamento';

@Injectable({
  providedIn: 'root'
})
export class FinancService {

  //Url Lançamentos
  private urlLanc = 'https://apigerenfinan.herokuapp.com/lancamentos?_sort=id&_order=desc';
  //Url Sandos e investimentos
  private urlSI = 'https://apigerenfinan.herokuapp.com/saldo_invest';

  private urlLanP = 'https://apigerenfinan.herokuapp.com/lancamentos';

  private urlCCusto = 'https://apigerenfinan.herokuapp.com/ccusto';

  constructor(private http: HttpClient) { }

  getLan(){
    return this.http.get(`${this.urlLanc}`);
  }
  
  getSaldInv(){
    return this.http.get(`${this.urlSI}`);
  }

  getCCusto(){
    return this.http.get(`${this.urlCCusto}`);
  }

  public cadastrar(lancamento: Lancamento){
    return this.http.post(this.urlLanP, lancamento);
  }

  public buscarId(id: number){
    return this.http.get(`${this.urlLanP}/${id}`);
  }

  public alterar(lancamento: Lancamento){
    return this.http.put(`${this.urlLanP}/${lancamento.id}`, lancamento);
  }

  public deletar(id: number){
    //return this.http.delete(`${this.urlLanP}/${id}`);
    this.http.delete(`${this.urlLanP}/${id}`).subscribe(
      //resp => console.log('deleted'),
      //error => console.log('error occur, delete fail')
  );
  }

}
