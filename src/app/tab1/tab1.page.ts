import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeleteLancamentoDto } from '../models/DeleteLancamentoDto';
import { Lancamento } from '../models/Lancamento';
import { FinancService } from '../services/lancamentos/financ.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public info: any = [];
  public lancamento: Lancamento = {};
  public deleteLancamentoDto: DeleteLancamentoDto = {};

  constructor(private finanService: FinancService, private route: ActivatedRoute, public alert: AlertController) { }

  /*
    ngOnInit: Executado após o Angular inicializar todas as propriedades vinculadas a dados de uma diretiva.    
  */
    ngOnInit() {
      this.getLancamento();
    }
  /*ionViewWillEnter() {
    this.getLancamento();  
  }*/

  public getLancamento() {
    this.finanService.getAllLancamento().subscribe(data => {
      this.info = data;
      console.log(data);
    });
  }

   /*
    "Deleta" o lançamento incluindo um * no campo D_E_L_E_T_      
  */
  public async deleteLancamento(id: number) {
    //Pergunta "Lançamento excluído com sucesso"
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
          handler: async () => {
            this.deleteLancamentoDto.id=id;
            this.deleteLancamentoDto.deletado='*';
            this.finanService.deleteLancamento(this.deleteLancamentoDto);
            //Aleta "Lançamento excluído com sucesso"
            const alert = await this.alert.create({
              cssClass: 'my-custom-class',
              subHeader: 'Lançamento excluído com sucesso!',
              buttons: ['OK']
            });
            await alert.present();
            window.location.reload(); //Atualiza a páginas
          }
        }
      ]
    });    
    await alert.present();      
  }
}
