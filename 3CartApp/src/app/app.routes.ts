import { Routes } from '@angular/router';
import { CarroComponent } from './components/carro/carro.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/catalog', pathMatch: 'full'
    },
    {
        path: 'cart' , component: CarroComponent
    },
    {
        path: 'catalog',component:CatalogoComponent
    },
    
];
