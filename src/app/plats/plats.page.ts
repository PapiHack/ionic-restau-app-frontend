import { Component } from '@angular/core';
import { Plat } from '../model/plat';
import { PlatService } from '../services/plat.service';

@Component({
  selector: 'app-plats',
  templateUrl: 'plats.page.html',
  styleUrls: ['plats.page.scss']
})
export class PlatsPage {
  plats: Plat[];

  constructor(private platService: PlatService) {}

  getAllPlat(): void {
    this.platService.getAll().subscribe(
      plats => this.plats = plats
    );
  }

}
