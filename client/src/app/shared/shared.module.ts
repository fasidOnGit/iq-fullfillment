import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortableHeaderDirective } from './data-table/sortable-header.directive';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, DataTableComponent, SortableHeaderDirective],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, NgbModule
  ], exports: [HeaderComponent, FooterComponent, DataTableComponent ]
})
export class SharedModule { }
