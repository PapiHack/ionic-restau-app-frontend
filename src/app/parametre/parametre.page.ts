import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';
import { User } from '../model/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.page.html',
  styleUrls: ['./parametre.page.scss'],
})
export class ParametrePage implements OnInit {

  user: User;
  resetForm: FormGroup;
  isAdmin: boolean;

  constructor(private authService: AuthService,
              private utilsService: UtilsService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.user = this.authService.user;
    this.resetForm = this.formBuilder.group({
      username: new FormControl({ value: this.user.username, disabled: true }, [Validators.required, Validators.minLength(4)]),
      old_password: [null, [Validators.required, Validators.minLength(4)]],
      new_password: [null, [Validators.required, Validators.minLength(4)]],
      confirm_password: [null, [Validators.required, Validators.minLength(4)]]
    });
    this.isAdmin = this.authService.user.statut.toString() === 'admin' ? true : false;
  }

  reset(info: any): void {
    console.log(info);
    const loginInfo: any = {
      identifier: '',
      password: ''
    };
    loginInfo.identifier = this.user.username;
    loginInfo.password = info.old_password;
    this.authService.login(loginInfo).subscribe(
      data => {
        if (info.new_password === info.confirm_password) {
          this.user.password = info.new_password;
          this.userService.update(this.user).subscribe (
            res => {
              // tslint:disable-next-line: max-line-length
              this.utilsService.presentToast('Votre mot de passe a bien été réinitialisé, vous allez devoir vous reconnecter !', 'success');
              window.localStorage.removeItem('token');
              this.router.navigate(['login']);
            },
            error => console.log('erreur', error)
          );
        } else {
          this.utilsService.presentToast('Les mots de passe ne sont pas conformes !', 'danger');
        }
      },
      error => {
        this.utilsService.presentToast('L\'ancien mot de passe n\'est pas conforme !', 'danger');
      }
    );
  }

  onCancel() {
    this.location.back();
  }

}
