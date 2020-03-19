import { Component, OnInit, Input } from '@angular/core';
import { Plat } from 'src/app/model/plat';
import { AuthService } from 'src/app/services/auth.service';
import { userStatus } from 'src/app/model/userStatus';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.scss'],
})
export class PlatComponent implements OnInit {

  @Input() plat: Plat;
  isAdmin: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const status = this.authService.user.statut.toString();
    this.isAdmin = status === 'admin' ? true : false;
  }

  onOrder(plat: Plat) {
    console.log(`Commande du plat: ${plat.nom} !!!`);
  }

}
