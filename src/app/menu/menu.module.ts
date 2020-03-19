import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuPage } from './menu.page';
import { MenuComponent } from '../components/menu/menu.component';
import { PlatMenuModule } from '../plat-menu/plat-menu.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlatMenuModule,
    RouterModule.forChild([{ path: '', component: MenuPage }])
  ],
  declarations: [MenuPage, MenuComponent]
})
export class MenuPageModule {}
