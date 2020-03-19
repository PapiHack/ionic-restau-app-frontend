import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';
import { Plat } from 'src/app/model/plat';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.page.html',
  styleUrls: ['./modifier.page.scss'],
})
export class ModifierPage implements OnInit {

  id: number;
  plat: Plat;

  constructor(private route: ActivatedRoute,
              private platService: PlatService,
              private alertCtrl: AlertController,
              private location: Location,
              private router: Router) {
   }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.platService.get(this.id).subscribe(
      p => {
        p.imageUrl = p.imageUrl == null ? '' : p.imageUrl;
        this.plat = p;
      },
      error => console.log('Erreur ', error)
    );
  }

  onCancel(): void {
    this.location.back();
  }

  onUpdate(): void {
    if (!this.platService.validatePlat(this.plat)) {
      this.alertCtrl.create({
        message: 'Informations du plat invalides !',
        buttons: ['OK'],
        header: 'Erreur',
      }).then(alertEl => alertEl.present());
      return ;
    }
    this.platService.update(this.plat).subscribe(
      p => {
        console.log(`Plat ${p.nom} updated !`);
        this.router.navigate(['/tabs/plats']);
      },
      error => console.log('Erreur ', error)
    );
    console.log('Update button taped !');
  }

}
