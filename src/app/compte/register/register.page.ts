import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private utilsService: UtilsService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  register(registerInfos: any): void {
    this.authService.register(registerInfos).subscribe(data => {
      this.utilsService.presentToast('Inscription réussie', 'success');
      this.router.navigate(['login']);
    }, error => {
        console.log('erreur ', error);
        switch (error.error.message[0].messages[0].id) {
          case 'Auth.form.error.username.taken':
            this.utilsService.presentToast('Ce nom d\'utilisateur existe déjà !', 'danger');
            break;
          case 'Auth.form.error.email.taken':
            this.utilsService.presentToast('Cette adresse email existe déjà ', 'danger');
            break;
          default :
            this.utilsService.presentToast('Une erreur est survenue !', 'danger');
      }
    });
  }
}
