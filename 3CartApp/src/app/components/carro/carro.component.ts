import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cartItem } from '../../models/cart-item';

@Component({
  selector: 'app-carro',
  standalone: true,
  imports: [],
  templateUrl: './carro.component.html',
  styleUrl: './carro.component.css'
})
export class CarroComponent {

  @Input() items: cartItem[] = []
  @Input() total= 0
  @Output() idProductEventEmitter = new EventEmitter()

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id)
  }

}
