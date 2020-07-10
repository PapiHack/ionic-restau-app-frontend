import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { userStatus } from '../model/userStatus';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private alertCtrl: AlertController,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.getAllUser();
  }

  // Ionic Page Life Cycle Hook
  ionViewWillEnter() {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAll().subscribe (
      users => this.users = users.filter(user => user.id !== this.authService.user.id),
      error => console.log(error)
    );
  }

  changeUserStatus(user: User): void {
    this.alertCtrl.create({
      header: 'Changement de profil utilisateur',
      message: 'Etes-vous vraiment sûr de vouloir changer le statut de cet utilisateur ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Oui, j\'en suis sûre!',
          handler: () => {
            const statut = user.statut.toString() === 'admin' ? 'employe' : 'admin';
            this.userService.updateById(user.id, { statut }).subscribe(
              data => {
                console.log('data', data);
                this.utilsService.presentToast('Le profil cet utilsateur a bien été mis à jour !', 'success');
                this.getAllUser();
                this.router.navigate(['users']);
              },
              error => console.log('erreur', error)
            );
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

}
