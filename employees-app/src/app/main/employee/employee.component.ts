import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/models';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit, OnChanges {
  employees$: Observable<Employee[]> | any;
  error: string | any;
  @Input() filter: number | any;
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter();
  @Output() updateEvent: EventEmitter<Employee> = new EventEmitter();
  constructor(
    private employeesService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  private handleError(error: HttpErrorResponse): void {
    if (error.status == 0) this.error = 'Connection refused :(';
    else this.error = error.error + ', ' + error.status + ':(';
  }

  ngOnInit(): void {
    this.employees$ = this.employeesService.getEmployees().pipe(
      catchError((err) => {
        this.handleError(err);
        return EMPTY;
      })
    );
  }

  ngOnChanges(): void {
    if (this.filter && this.filter != 0) {
      this.employees$ = this.employeesService
        .filterEmployeesByAge(this.filter)
        .pipe(
          catchError((err) => {
            this.handleError(err);
            return EMPTY;
          })
        );
    } else
      this.employees$ = this.employees$ = this.employeesService
        .getEmployees()
        .pipe(
          catchError((err) => {
            this.handleError(err);
            return EMPTY;
          })
        );

  }

  openSnackBar() {
    this.snackBar.open(this.error, 'Ok', {
      duration: 3000,
    });
  }

  onDelete(event: any): void {
    let dialogRef = this.dialog.open(DeleteEmployeeComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.employeesService
          .deleteEmployee(event)
          .subscribe(
            (_: any) => (this.employees$ = this.employeesService.getEmployees())
          );
      }
    });
  }

  onUpdate(event: Employee): void {
    let dialogRef = this.dialog.open(UpdateEmployeeComponent);
    dialogRef.componentInstance.employee = event;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.employeesService.updateEmployee(result.employee).subscribe(
          (_: any) => (this.employees$ = this.employeesService.getEmployees()),
          (error: HttpErrorResponse) => {
            this.handleError(error);
            this.openSnackBar();
          }
        );
      }
    });
  }
}
