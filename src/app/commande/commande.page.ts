import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { Commande } from '../model/commande';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  styleUrls: ['./commande.page.scss'],
})
export class CommandePage implements OnInit {

  commandes: Commande[] = [];

  constructor(private commandeService: CommandeService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.getAllCommande();
  }

  // Ionic Page Life Cycle Hook
  ionViewWillEnter() {
    this.getAllCommande();
  }

  getAllCommande(): void {
    this.commandeService.getAll().subscribe(
      commandes => this.commandes = commandes.filter(com => com.date_commande.toString() === this.utilsService.getFormattedDate()),
      error => console.log(error)
    );
  }

}
