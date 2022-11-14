import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {DashboardComponent} from "@pages/dashboard/dashboard.component";
import {ProductsComponent} from "@pages/products/products.component";
import {HomeComponent} from "@pages/home/home.component";

const routes: Routes = [
  {path: '', component: AppComponent, children: [
      {path: 'products', component: ProductsComponent},
      {path: 'dashboard', component: HomeComponent, children: [
          {path: 'menu2', component: DashboardComponent},
          {path: 'menu3', component: DashboardComponent},
          {path: 'menu4', component: DashboardComponent},
          {path: 'menu5', component: DashboardComponent},
          {path: 'menu6', component: DashboardComponent},
        ]},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
