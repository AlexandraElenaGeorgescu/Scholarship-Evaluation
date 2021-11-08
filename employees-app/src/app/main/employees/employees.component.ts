import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Employee } from 'src/app/models';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  @Input() id: string = 'test';
  @Input() name: string = 'Georgescu Alexangra';
  @Input() age: number = 20;
  @Input() position: string = 'iOS Developer';
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter();
  @Output() updateEvent: EventEmitter<Employee> = new EventEmitter();
  

  constructor(private matDialog: MatDialog) {}

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
  ngOnInit(): void {
    let toAdd = this.getRandomInt(4);
  }

  delete(): void {
    this.deleteEvent.emit(this.id);
  }

  update(): void {
    let employee: Employee = {
      id: this.id,
      name: this.name,
      age: this.age,
      position: this.position,
    };
    this.updateEvent.emit(employee);
  }
}
