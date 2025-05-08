import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { PanelMenuComponent } from '../components/panel-menu/panel-menu.component';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ecom-home-layout',
  imports: [RouterModule, HeaderComponent, PanelMenuComponent, PrimengModule, CommonModule],
  standalone: true,
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
})
export class HomeLayoutComponent {
  constructor(public commonService: CommonService) { }

  panelChange() {
    console.log('panelChange');
  }
}
