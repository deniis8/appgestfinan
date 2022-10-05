import { Component } from '@angular/core';
import { FinancService } from '../services/lancamentos/financ.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public infoSaldI: any = [];

  constructor(private finanService: FinancService) {
    //this.getSaldInv();
  }

  ngOnInit() {
  }

  /*public getSaldInv(){
    this.finanService.getSaldInv().subscribe(dados=> {
      this.infoSaldI = dados;
    })
  }*/

  

}
