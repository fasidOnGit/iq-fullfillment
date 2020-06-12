import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { SortableHeaderDirective, SortEvent } from './sortable-header.directive';
import { DataTableService } from './data-table.service';
import { TableData } from './TableData';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  providers: [DataTableService, DecimalPipe]
})
export class DataTableComponent implements OnInit {

  users$: Observable<TableData[]>;
  total$: Observable<number>;

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  constructor(public service: DataTableService, public router: Router) {
    this.users$ = service.users$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {
  }

  onRouteAdd() {
    this.router.navigate(['/pages/user/add']);
  }
}
