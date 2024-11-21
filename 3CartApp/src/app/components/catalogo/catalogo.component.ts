import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { state } from '@angular/animations';
import { load } from '../../store/product.action';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

  products!: Product[]
  
  private sharingDataS= inject(SharingDataService)
 

  constructor( private productService: ProductService, private store: Store<{products: any}>) {
    this.store.select('products').subscribe(state => this.products = state.products)
  }

  ngOnInit(): void {
   
      this.store.dispatch(load({products: this.productService.findAll()}))
    
  }

  onAddCart(product: Product){
    this.sharingDataS.productEventEmitter.emit(product)
  }


}