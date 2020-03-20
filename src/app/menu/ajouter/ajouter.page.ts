import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/model/menu';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Plat } from 'src/app/model/plat';
import { PlatService } from 'src/app/services/plat.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.page.html',
  styleUrls: ['./ajouter.page.scss'],
})
export class AjouterPage implements OnInit {

  menu: Menu;
  menuForm: FormGroup;
  plats: Plat[] = [];

  constructor(private menuService: MenuService,
              private platService: PlatService,
              private router: Router,
              private location: Location,
              private utilsService: UtilsService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.platService.getAll().subscribe(
      plats => this.plats = plats,
      error => console.log(error)
    );
    this.menuForm = this.formBuilder.group({
      plats: [null, [Validators.required]]
    });
  }

  createMenu(menuInfo: any) {
      this.menu = new Menu();
      this.menu.date_menu = new Date(); // this.utilsService.getFormattedDate();
      this.menu.plats = menuInfo.plats;
      if (this.menu.plats === null || this.menu.plats.length === 0) {
        this.utilsService.presentToast('Veuillez renseigner les plats du menu svp !', 'danger');
      } else {
        this.menuService.add(this.menu).subscribe(
          data => {
            this.utilsService.presentToast('Le menu a bien été créé !', 'success');
            this.router.navigate(['tabs/menu']);
          },
          error => {
            console.log('Erreur', error);
            this.utilsService.presentToast('Une erreur est survenue lors de la création du menu !', 'danger');
          }
        );
        console.log('Menu soumis', this.menu);
      }
  }

  goToMenu() {
    this.location.back();
  }

}
