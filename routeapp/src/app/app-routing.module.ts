import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PanelComponent} from './components/panel/panel.component';
import {AboutComponent} from './components/about/about.component';
import {EditBookComponent} from './components/edit-book/edit-book.component';
import {AddBookComponent} from './components/add-book/add-book.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {RegisterComponent} from './components/register/register.component';
import {ClientHomeComponent} from './components/client-home/client-home.component';
import {CartComponent} from './components/cart/cart.component';
import {OrdersComponent} from './components/orders/orders.component';

const routes:Routes = [
  /*{path: '/', redirectTo: 'login', pathMatch: 'full' },/**/
  {path: '', component: ClientHomeComponent},
  {path: 'about', component: AboutComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'cart', component: CartComponent},
  {path: 'panel', component: PanelComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'addbook', component: AddBookComponent, canActivate: [AuthGuard] },
  {path: 'book/:id', component: EditBookComponent, canActivate: [AuthGuard] },
  {path: '**', component: NotFoundComponent }, // Любой роут который не совпал выше
  ];
@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthGuard,
  ],
})
export class AppRoutingModule { }
