import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgOptionHighlightModule} from "@ng-select/ng-option-highlight";
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "../service/data.service";

@NgModule({
  declarations: [ HeaderComponent, FooterComponent ],
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    DataService
  ]
})
export class SharedModule { }
