import { Component, OnInit, Input } from '@angular/core';
import { Plat } from 'src/app/model/plat';
import { AuthService } from 'src/app/services/auth.service';
import { CommandeService } from 'src/app/services/commande.service';
import { AlertController } from '@ionic/angular';
import { Commande } from 'src/app/model/commande';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.scss'],
})
export class PlatComponent implements OnInit {

  @Input() plat: Plat;
  isAdmin: boolean;
  isMenuPage: boolean;
  commande: Commande;

  constructor(private authService: AuthService,
              private commandeService: CommandeService,
              private utilsService: UtilsService,
              private router: Router,
              private alertCtrl: AlertController) {
  }

  ngOnInit() {
    const status = this.authService.user.statut.toString();
    this.isAdmin = status === 'admin' ? true : false;
    this.isMenuPage = window.location.pathname === '/tabs/menu' ? true : false;
  }

  onOrder(plat: Plat) {
    this.commande = new Commande();
    this.commande.date_commande = new Date();
    this.commande.user = this.authService.user;
    this.commande.plats = [];
    this.commande.plats.push(plat);
    console.log(`Commande du plat: ${plat.nom} !!!`);
    this.alertCtrl.create({
      header: 'Commande de plat',
      message: 'Etes vous sûr de vouloir vraiment commander ce plat ?',
      buttons: [
        {
          text: 'Non !',
          role: 'cancel',
        },
        {
          text: 'Oui, je commande ce plat!',
          handler: () => {
            this.commandeService.add(this.commande).subscribe(
              data => {
                this.utilsService.presentToast('Votre commande a bien été enregistré !', 'success');
                this.router.navigate(['tabs/menu']);
              },
              error => {
                console.log('erreur', error);
                this.utilsService.presentToast('Une erreur est survenue lors de l\'enregistrement de votre commande !', 'danger');
              }
            );
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

}
