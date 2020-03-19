import { Component, OnInit, Input } from '@angular/core';
import { Plat } from 'src/app/model/plat';
import { PlatService } from 'src/app/services/plat.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.page.html',
  styleUrls: ['./ajouter.page.scss'],
})
export class AjouterPage implements OnInit {

  plat = {
    nom: '',
    description: '',
    prix: '',
    imageUrl: ''
  };

  constructor(private platService: PlatService,
              private router: Router,
              private location: Location,
              private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onAdd(): void {
    console.log('Add button clicked !', this.plat);
    const plat: Plat = new Plat(0, this.plat.nom, this.plat.description, this.plat.imageUrl, +this.plat.prix);
    if (!this.platService.validatePlat(plat)) {
      this.alertCtrl.create({
        message: 'Informations du plat invalides !',
        buttons: ['OK'],
        header: 'Erreur',
      }).then(alertEl => alertEl.present());
      return ;
    }
    this.platService.add(plat).subscribe(
      p => {
        console.log('Plat', p);
        this.router.navigate(['/tabs/plats']);
      },
      error => console.log('Erreur ', error)
    );
  }

  onCancel(): void {
    this.location.back();
  }

}
