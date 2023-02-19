import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinancService {

  //Url Lançamentos
  private URL_API_LANCAMENTOS = 'http://192.168.0.101:5000/api/';

  constructor(private http: HttpClient) { }

  //Lançamentos
  getAllLancamento() {
    return this.http.get(`${this.URL_API_LANCAMENTOS}${"lancamentos/data"}`);
  }

  getAllLancamentoPorData(data: string) {
    return this.http.get(`${this.URL_API_LANCAMENTOS}${"lancamentos/data/"}${data}`);
  }

  /*
  public getAllLancamento(){
    return new Promise((resolve, reject) =>{
      let url = this.URL_API_LANCAMENTOS + 'lancamentos';
     
      this.http.get(url)
      .subscribe((result: any) => {
        //resolve(result.json())
      },
      (error) => {
        //reject(error.json());
      })
    })
  }*/

  public getLancamentoPorId(id: number) {
    return this.http.get(`${this.URL_API_LANCAMENTOS}${"lancamentos"}/${id}`);
  }

  public postLancamento(dataHora: Date, valor: number, descricao: string, status: string, idCCusto: number) {
    return new Promise((resolve, reject) => {
      let data = {
        dataHora: dataHora,
        valor: valor,
        descricao: descricao,
        status: status,
        idCCusto: idCCusto,
        idUsuario: 1
      };
      this.http.post(this.URL_API_LANCAMENTOS + 'lancamentos', data)
        .subscribe((result: any) => {
          //resolve(result.json())
        },
          (error) => {
            //reject(error.json());
          })
    })
  }

  public putLancamento(lancamento: any) {
    return new Promise((resolve, reject) => {
      let url = this.URL_API_LANCAMENTOS + 'lancamentos/' + lancamento.id;
      let data = {
        "dataHora": lancamento.dataHora,
        "valor": lancamento.valor,
        "descricao": lancamento.descricao,
        "status": lancamento.status,
        "idCCusto": lancamento.idCCusto
      };
      this.http.put(url, data)
        .subscribe((result: any) => {
          //resolve(result.json())
        },
          (error) => {
            //reject(error.json());
          })
    })
  }

  public deleteLancamento(lancamento: any) {
    return new Promise((resolve, reject) => {
      let url = this.URL_API_LANCAMENTOS + 'lancamentos/del/' + lancamento.id;
      let data = {
        "deletado": lancamento.deletado
      };
      this.http.put(url, data)
        .subscribe((result: any) => {
          //resolve(result.json())
        },
          (error) => {
            //reject(error.json());
          })
    })
  }

}
