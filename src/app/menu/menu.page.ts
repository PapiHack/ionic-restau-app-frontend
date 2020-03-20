import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../model/menu';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage implements OnInit {

  menus: Menu[] = [];
  isAdmin: boolean;

  constructor(private menuService: MenuService,
              private utilsService: UtilsService,
              private authService: AuthService) {}

  ngOnInit() {
    this.getAllMenu();
    this.isAdmin = this.authService.user.statut.toString() === 'admin' ? true : false;
  }

  // Ionic Page Life Cycle Hook
  ionViewWillEnter() {
    this.getAllMenu();
  }

  getAllMenu() {
    this.menuService.getAll().subscribe(
      menus => this.menus = menus.filter(m => m.date_menu.toString() === this.utilsService.getFormattedDate()),
      error => console.log('error', error)
    );
  }

}
