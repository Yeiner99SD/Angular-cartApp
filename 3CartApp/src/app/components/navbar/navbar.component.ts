import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cartItem } from '../../models/cart-item';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() items: cartItem[] = []
  @Output() openEventEmitter = new EventEmitter()

  openCart(): void {
    this.openEventEmitter.emit()
  }

}
