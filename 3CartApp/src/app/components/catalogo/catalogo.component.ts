import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  @Input() products!: Product[]
  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter()

  onAddCart(product: Product){
    this.productEventEmitter.emit(product)
  }

}
