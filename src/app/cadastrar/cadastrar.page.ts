import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Lancamento } from '../models/Lancamento';
import { CentroCustoService } from '../services/centro-custo/centro-custo.service';
import { FinancService } from '../services/lancamentos/financ.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  public lancamento: Lancamento = {};
  public infoCCusto: any = [];
  public info: any = [];

  constructor(private finanService: FinancService, private centroCustoCervice: CentroCustoService,
    public alert: AlertController, private router: Router) {
  }

  /*
   ngOnInit: Executado após o Angular inicializar todas as propriedades vinculadas a dados de uma diretiva.
 */
  ngOnInit() {
    this.getCCusto();
  }
  /*
    Salva a inclusão do Lançamento
  */
  public async salvarInclusao() {
    if (this.lancamento.dataHora != null && this.lancamento.valor > 0 && (this.lancamento.descricao != "" && this.lancamento.descricao != undefined) && this.lancamento.idCCusto > 0 && (this.lancamento.status != "" && this.lancamento.status != undefined)) {
      console.log("Descrição:" + this.lancamento.valor);
      this.finanService.postLancamento(this.lancamento.dataHora, this.lancamento.valor, this.lancamento.descricao, this.lancamento.status, this.lancamento.idCCusto);
      this.router.navigate(['/tabs/tab1']); //Volta para a tela principal
      //Mensagem de sucesso
      const alert = await this.alert.create({
        //cssClass: 'my-custom-class',
        //header: 'Atenção!',
        //subHeader: 'Lançamento registrado com Sucesso!',
        //buttons: ['OK']
      });
      await alert.present();
      window.location.reload(); //Atualiza a páginas
    }
  }
  /*
    Faz busca nos centros de custos para preencher o ion-select
  */
  public getCCusto() {
    this.centroCustoCervice.getCCusto().subscribe(dadosCC => {
      this.infoCCusto = dadosCC;
      console.log(dadosCC);
    });
  }

}
