import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Plugins, CameraResultType } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-compte',
  templateUrl: 'compte.page.html',
  styleUrls: ['compte.page.scss']
})
export class ComptePage implements OnInit {
  userInfoForm: FormGroup;
  image = null;
  user: User = new User();

  constructor(private router: Router,
              private location: Location,
              private sanitizer: DomSanitizer,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private utilsService: UtilsService,
              private userService: UserService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.user = this.authService.user;
    this.userInfoForm = this.formBuilder.group({
      nom: [this.user.nom, [Validators.required, Validators.minLength(2)]],
      prenom: [this.user.prenom, [Validators.required, Validators.minLength(2)]],
      adresse: [this.user.adresse, [Validators.required, Validators.minLength(2)]],
      telephone: [this.user.telephone, [Validators.required]],
    });
  }

  changeInfos(event: any, userInfos: User): void {
    console.log(event);
    event.preventDefault();
    console.log('INFOS ====> ' + JSON.stringify(userInfos));
    const { nom, prenom, adresse, telephone } = userInfos;
    this.user.nom = nom;
    this.user.prenom = prenom;
    this.user.adresse = adresse;
    this.user.telephone = telephone;
    if (this.image !== null) {
      this.user.photo = this.image.changingThisBreaksApplicationSecurity;
    }
    console.log('USER', this.user);
    this.alertCtrl.create({
      header: 'Mise à jour du profil',
      message: 'Etes-vous sûre de vouloir mettre à jour vos infos ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Oui, j\'en suis sûre!',
          handler: () => {
            this.userService.update(this.user).subscribe(
              data => {
                console.log('data', data);
                this.utilsService.presentToast('Les informations de votre compte ont bien été mises à jour !', 'success');
                this.router.navigate(['tabs/compte']);
              },
              error => {
                console.log('Erreur', error);
                this.utilsService.presentToast('Une erreur est survenue lors de la mise à jour de vos informations !', 'danger');
              }
            );
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

  onLogout() {
    window.localStorage.removeItem('token');
    this.authService.isAuthenticated = false;
    this.utilsService.presentToast('Vous vous êtes bien déconnecté !', 'success');
    this.router.navigate(['login']);
  }

  onCancel(): void {
    this.location.back();
  }

  async getPhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
