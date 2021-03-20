import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatRowDef, MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

import {DigiService} from '../digi.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'email', 'phone', 'gender', 'age', 'delete'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(private digiService: DigiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.digiService.displayAllMockUser().subscribe((Response: any) => {
      this.dataSource = Response;
    });
  }

  delete(element: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.digiService.deleteMockUser(element.id).subscribe((Response:any) => {
          Swal.fire(
            'Deleted!',
            Response.data.message,
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }

  onRowClicked(row: any) {
    this.digiService.displaySingleMockUser(row.id).subscribe((Response: any) => {
      this.dialog.open(DialogOverviewExampleDialog, {
        width: '500px',
        data: Response.data
      })
    });

  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) {}

  onNoClick(): void {
    this.dialogRef.close();
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
