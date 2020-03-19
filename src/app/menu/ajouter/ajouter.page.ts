import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/model/menu';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.page.html',
  styleUrls: ['./ajouter.page.scss'],
})
export class AjouterPage implements OnInit {

  menu: Menu;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
  }

}
