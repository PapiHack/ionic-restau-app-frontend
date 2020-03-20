import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { Commande } from '../model/commande';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  styleUrls: ['./commande.page.scss'],
})
export class CommandePage implements OnInit {

  commandes: Commande[] = [];

  constructor(private commandeService: CommandeService) { }

  ngOnInit() {
    this.getAllCommande();
  }

  // Ionic Page Life Cycle Hook
  ionViewWillEnter() {
    this.getAllCommande();
  }

  getAllCommande(): void {
    this.commandeService.getAll().subscribe(
      commandes => this.commandes = commandes,
      error => console.log(error)
    );
  }

}
