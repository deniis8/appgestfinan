import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
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

  constructor(private route: ActivatedRoute, private finanService: FinancService, 
    private centroCustoService: CentroCustoService, public alert: AlertController) { 
    this.getCCusto();
  }
  /*
    ngOnInit: Executado após o Angular inicializar todas as propriedades vinculadas a dados de uma diretiva.
    Filtra o lançamento por Id, o retorno é apresentado na tela de alteração.
  */
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.finanService.getLancamentoPorId(this.id).subscribe(dados=>{
      this.lancamento = dados[0];
      console.log(this.lancamento);
    });
  }
  /*
    Lista os centros de custos
  */
  public getCCusto(){
    this.centroCustoService.getCCusto().subscribe(dadosCC=> {
      this.infoCCusto = dadosCC;
      console.log(dadosCC);
    });
  }
  /*
    Salva a edição do Lançamento
  */
  public async salvarEdicaoLancamento(){
    if(this.lancamento.valor>0 && this.lancamento.descricao!="" && this.lancamento.idCCusto>0 && this.lancamento.status!=""){
      this.finanService.putLancamento(this.lancamento).subscribe(retorno =>{
        this.lancamento = retorno;            
      });
      const alert = await this.alert.create({
        cssClass: 'my-custom-class',
        header: 'Atenção!',
        subHeader: 'Registro alterado com sucesso!',
        buttons: ['OK']
      });       
      await alert.present();    
      //this.router.navigate(['/tabs/tab1']);  
      window.location.reload(); //Atualiza a página   
    }        
  }
}
