import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Menu } from 'src/app/model/menu';

@Component({
  selector: 'restau-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() menu: Menu;

  constructor(private menuService: MenuService,
              private authService: AuthService,
              private utilsService: UtilsService) { }

  ngOnInit() {}

}
