import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatRowDef, MatTableDataSource} from '@angular/material/table';

import {DigiService} from '../digi.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'email', 'phone', 'gender', 'age'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(private digiService: DigiService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.digiService.getTableData().subscribe((Response: any) => {
      this.dataSource = Response;
    });
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

}

export interface PeriodicElement {
  id: number;
  userName: string;
  email: string;
  phone: number;
  gender: string;
  age: number;
}
