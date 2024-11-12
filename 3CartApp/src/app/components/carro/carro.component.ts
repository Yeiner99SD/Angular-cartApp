import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { cartItem } from '../../models/cart-item';

@Component({
  selector: 'app-carro',
  standalone: true,
  imports: [],
  templateUrl: './carro.component.html',
  styleUrl: './carro.component.css'
})
export class CarroComponent implements OnChanges {
  
  
  @Input() items: cartItem[] = []
  @Input() total= 0
  @Output() idProductEventEmitter = new EventEmitter()
  
  ngOnChanges(changes: SimpleChanges): void {
    let itemsChanges = changes['items']
    this.calculatedTotal()
    if(!itemsChanges.firstChange){
      this.saveSessions()
    }
  }
                               

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id)
  }
  calculatedTotal(): void{
    this.total = this.items.reduce( (accumulator, item ) => accumulator + item.quantity * item.product.price, 0)
    
  }

  saveSessions(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items))
  }

}
