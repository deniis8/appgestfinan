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
  

  constructor(private finanService: FinancService, private centroCustoCervice: CentroCustoService, public alert: AlertController, 
    private navCtrl:NavController, private router: Router) { 
    this.getCCusto();
  }

  ngOnInit() {
  }

  
  public async salvar(){
    if(this.lancamento.dataHora!=null && this.lancamento.valor>0 && this.lancamento.descricao!="" && this.lancamento.idCCusto>0 && this.lancamento.status!=""){
      this.finanService.postLancamento(this.lancamento).subscribe(retorno =>{
        this.lancamento = retorno;       
        this.abrirAlert();
        this.finanService.getLancamento().subscribe(dados=> {
          this.info = dados;
        });
      });
      //routerLink="/tabs/tab1"
      //Volta para a tela principal
      this.router.navigate(['/tabs/tab1']);
    }     
  }
  
  async abrirAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      subHeader: 'Lançamento registrado com Sucesso!',
      buttons: ['OK']
    });    
    await alert.present();
    window.location.reload(); //Atualiza a páginas
  }

  public getCCusto(){
    this.centroCustoCervice.getCCusto().subscribe(dadosCC=> {
      this.infoCCusto = dadosCC;
      console.log(dadosCC);
    });
  }

}
