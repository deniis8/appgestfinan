import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lancamento } from '../models/Lancamento';
import { FinancService } from '../services/financ.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public info: any = [];
  public lancamento: Lancamento = {};
  public id: number;

  constructor(private finanService: FinancService, private route: ActivatedRoute, public alert: AlertController) {}



  ionViewWillEnter(){    
    this.getLan();
    console.log("teste");
  }

  public getLan(){
    this.finanService.getLan().subscribe(data=> {
      this.info = data;
      console.log(data);
    });
    console.log("teste2");
    
  } 

  public async deletar(id : number){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      subHeader: 'Deseja excluir o lançamento selecionado?',
      buttons: [
        {        
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.finanService.deletar(id);
            this.regisAlt();
          }
        }
      ]
    });

    await alert.present();
    
  }

  async regisAlt() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      subHeader: 'Lançamento excluído com sucesso!',
      buttons: ['OK']
    });
    await alert.present();

  }

}
