import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../model/menu';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage implements OnInit {

  menus: Menu[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.getAllMenu();
  }

  // Ionic Page Life Cycle Hook
  ionViewWillEnter() {
    this.getAllMenu();
  }

  getAllMenu() {
    this.menuService.getAll().subscribe(
      menus => this.menus = menus,
      error => console.log('error', error)
    );
  }

}
