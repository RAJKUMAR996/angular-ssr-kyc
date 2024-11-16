import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { routes } from './outer-routes.const';

@Component({
  selector: 'app-outer',  
  templateUrl: './outer.component.html',
  styleUrl: './outer.component.scss'
})
export class OuterComponent {

}
