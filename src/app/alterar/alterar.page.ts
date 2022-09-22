import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Lancamento } from '../models/Lancamento';
import { FinancService } from '../services/financ.service';

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

  constructor(private route: ActivatedRoute, private finanService: FinancService, public alert: AlertController, private navCtrl:NavController) { 
    //this.getCCusto();
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.finanService.buscarId(this.id).subscribe(dados=>{
      this.lancamento = dados;
    });
  }

  async alertAlterar() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      subHeader: 'Registro alterado com sucesso!',
      buttons: ['OK']
    });
    await alert.present();

  }

  public async retornarAlt(){
    this.navCtrl.pop();
  }
  /*
  public getCCusto(){
    this.finanService.getCCusto().subscribe(dadosCC=> {
      this.infoCCusto = dadosCC;
      console.log(dadosCC);
    });
  }
*/
  public async salvar(){
    this.finanService.alterar(this.lancamento).subscribe(retorno =>{
      this.lancamento = retorno;   
      this.alertAlterar();
      this.retornarAlt();   
    });
  }

}
