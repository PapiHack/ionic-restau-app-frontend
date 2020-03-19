import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-compte',
  templateUrl: 'compte.page.html',
  styleUrls: ['compte.page.scss']
})
export class ComptePage implements OnInit {
  userInfoForm: FormGroup;
  photo;
  image;
  user: User;

  constructor(private router: Router,
              private location: Location,
              private sanitizer: DomSanitizer,
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

  changeInfos(userInfos: User): void {
    console.log('INFOS ====> ' + JSON.stringify(userInfos));
    const { nom, prenom, adresse, telephone } = userInfos;
    this.user.nom = nom;
    this.user.prenom = prenom;
    this.user.adresse = adresse;
    this.user.telephone = telephone;
    this.user.photo = this.image.changingThisBreaksApplicationSecurity;
    console.log('USER', this.user);
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

  onLogout() {
    window.localStorage.removeItem('token');
    this.authService.isAuthenticated = false;
    this.utilsService.presentToast('Vous vous êtes bien déconnecté !', 'success');
    this.router.navigate(['login']);
  }

  onCancel(): void {
    this.location.back();
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
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
