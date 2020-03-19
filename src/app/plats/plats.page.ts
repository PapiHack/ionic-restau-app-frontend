import { Component, OnInit } from '@angular/core';
import { Plat } from '../model/plat';
import { PlatService } from '../services/plat.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-plats',
  templateUrl: 'plats.page.html',
  styleUrls: ['plats.page.scss']
})
export class PlatsPage implements OnInit {
  plats: Plat[] = [];

  constructor(private platService: PlatService,
              private alertCtrl: AlertController) {}

  ngOnInit() {
    this.getAllPlat();
  }

  // Ionic Page Life Cycle Hook
  ionViewWillEnter() {
    this.getAllPlat();
  }

  getAllPlat() {
    this.platService.getAll().subscribe(
      plats => this.plats = plats,
      error => console.log(error)
    );
  }

  onDelete(plat: Plat): void {
    this.alertCtrl.create({
      header: 'Suppression d\'un plat',
      message: 'Voulez-vous vraiment supprimer ce plat ?',
      buttons: [
        {
          text: 'Supprimer',
          handler: () => {
            this.platService.delete(plat.id).subscribe(
              p => {
                console.log(`Plat n°${plat.id}: ${p.nom} supprimé !`);
                this.getAllPlat();
              },
              error => console.log('Erreur ', error)
            );
          }
        },
        {
          text: 'Annuler',
          role: 'cancel'
        }
      ]
    }).then(alertEl => alertEl.present());
  }

}
