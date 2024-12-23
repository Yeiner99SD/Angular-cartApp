import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cartItem } from '../../models/cart-item';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() items: cartItem[] = []
  @Input() total:number = 0
   products: any;
 
 

}
