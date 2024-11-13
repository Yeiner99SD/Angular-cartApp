import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

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
 

  constructor( private productService: ProductService){
    

  }
  ngOnInit(): void {
   
      this.products = this.productService.findAll()
    
  }

  onAddCart(product: Product){
    this.sharingDataS.productEventEmitter.emit(product)
  }


}