import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Lancamento } from '../models/Lancamento';
import { FinancService } from '../services/financ.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  public lancamento: Lancamento = {};
  public infoCCusto: any = [];
  public info: any = [];
  

  constructor(private finanService: FinancService, public alert: AlertController, private navCtrl:NavController) { 
    this.getCCusto();
  }

  ngOnInit() {
  }

  
  public async salvar(){
    this.finanService.cadastrar(this.lancamento).subscribe(retorno =>{
      this.lancamento = retorno;       
      this.abrirAlert();
      this.finanService.getLan().subscribe(dados=> {
        this.info = dados;
      });
      //this.retornar();
    });
  }
  
/*
  public async salvar(){
    console.log("teste");
  }
*/
  async abrirAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      subHeader: 'Lançamento registrado com Sucesso!',
      buttons: ['OK']
    });

    await alert.present();

  }

  //Método usando para voltar a tela anterior.
  //A função desse método foi substituída por routerLink="/tabs/tab1" no próprio botão
  /*
  public async retornar(){
    this.navCtrl.pop();
  }*/

  public getCCusto(){
    this.finanService.getCCusto().subscribe(dadosCC=> {
      this.infoCCusto = dadosCC;
      console.log(dadosCC);
    });
  }

}
