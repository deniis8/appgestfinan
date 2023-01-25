import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonDatetime, NavController } from '@ionic/angular';
import { Lancamento } from '../models/Lancamento';
import { CentroCustoService } from '../services/centro-custo/centro-custo.service';
import { FinancService } from '../services/lancamentos/financ.service';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.page.html',
  styleUrls: ['./alterar.page.scss'],
})
export class AlterarPage implements OnInit {

  public lancamento: Lancamento = {};
  public id: number;
  public infoCCusto: any = [];
  public info: any = [];
  public isVoltar: boolean = false;

  constructor(private route: ActivatedRoute, private finanService: FinancService,
    private centroCustoService: CentroCustoService, public alert: AlertController, private router: Router) {
    this.getCCusto();
  }
  /*
    ngOnInit: Executado após o Angular inicializar todas as propriedades vinculadas a dados de uma diretiva.
    Filtra o lançamento por Id, o retorno é apresentado na tela de alteração.
  */
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.finanService.getLancamentoPorId(this.id).subscribe(dados => {
      this.lancamento = dados[0];
    });
  }
  /*
    Lista os centros de custos
  */
  public getCCusto() {
    this.centroCustoService.getCCusto().subscribe(dadosCC => {
      this.infoCCusto = dadosCC;
    });
  }
  /*
    Salva a edição do Lançamento
  */
  public async salvarEdicaoLancamento() {
    if (this.lancamento.dataHora != null && this.lancamento.valor > 0 && (this.lancamento.descricao != "" && this.lancamento.descricao != undefined) && this.lancamento.idCCusto > 0 && (this.lancamento.status != "" && this.lancamento.status != undefined)) {

      this.finanService.putLancamento(this.lancamento);
      const alert = await this.alert.create({
        //cssClass: 'my-custom-class',
        //header: 'Atenção!',
        //subHeader: 'Registro alterado com sucesso!',
        //buttons: ['OK']
      });
      await alert.present();
      this.atualizarPagina();
    }
  }

  public atualizarPagina() {
    this.router.navigate(['/tabs/tab1']);
    window.location.reload(); //Atualiza a página 
  }
}
