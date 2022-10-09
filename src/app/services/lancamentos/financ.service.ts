import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../../models/Lancamento';
import { DeleteLancamentoDto } from '../../models/DeleteLancamentoDto';

@Injectable({
  providedIn: 'root'
})
export class FinancService {

  //Url Lançamentos
  private urlLanc = 'https://localhost:5001/api/lancamentos';
  private urlLancDel = 'https://localhost:5001/api/lancamentos/del';

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
    console.log(lancamento);
    return this.http.put(`${this.urlLanc}/${lancamento.id}`, lancamento);
  }
  public deleteLancamento(deletadoDto: DeleteLancamentoDto){
    console.log("Serviço: " + deletadoDto);
    return this.http.put(`${this.urlLancDel}/${deletadoDto.id}`, deletadoDto);
  } 
  /*
  public deleteLancamento(id: number){
    //return this.http.delete(`${this.urlLanP}/${id}`);
    this.http.delete(`${this.urlLanc}/${id}`).subscribe(
      //resp => console.log('deleted'),
      //error => console.log('error occur, delete fail')
  );
  }*/ 

}
