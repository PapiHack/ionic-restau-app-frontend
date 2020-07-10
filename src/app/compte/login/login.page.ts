import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private builder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.loginForm = this.builder.group({
      identifier: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  login(loginInfos: any): void {
    this.authService.login(loginInfos).subscribe(data => {
      this.authService.user = data.user;
      this.authService.isAuthenticated = true;
      window.localStorage.setItem('token', data.jwt);
      this.router.navigateByUrl(this.authService.redirectUrl);
    }, error => {
      console.log('Erreur ', error);
      this.utilsService.presentToast('Nom d\'utilisateur ou mot de passe incorrect', 'danger');
    });
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }

}
