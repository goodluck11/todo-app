import {NgModule, Type} from '@angular/core';
import {NZ_MODULES} from "./ant.module";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CardComponent} from "@shared/card/card.component";
import {FormErrorComponent} from "@shared/form-error/form-error.component";
import {ChartsModule} from "ng2-charts";

export const SHARED_MODULES: Array<Type<any>> = [
  ...NZ_MODULES,
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  ChartsModule,
]

@NgModule({
  declarations: [CardComponent, FormErrorComponent],
  imports: SHARED_MODULES,
  exports: [...SHARED_MODULES, CardComponent, FormErrorComponent]
})
export class SharedModule { }
