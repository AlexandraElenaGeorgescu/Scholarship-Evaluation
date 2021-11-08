import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models';

@Injectable()
export class EmployeeService {
  readonly baseUrl = 'https://localhost:44396/';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(
      this.baseUrl + '/employees',
      this.httpOptions
    );
  }

  deleteEmployee(id: string) {
    return this.httpClient.delete(
      this.baseUrl + '/employees/' + id,
      this.httpOptions
    );
  }

  addEmployee(employee: Employee) {
    return this.httpClient.post(
      this.baseUrl + '/employees',
      employee,
      this.httpOptions
    );
  }

  updateEmployee(employee: Employee) {
    return this.httpClient.put(
      this.baseUrl + '/employees/',
      employee,
      this.httpOptions
    );
  }

  filterEmployeesByAge(age: number): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(
      this.baseUrl + '/employees/' + age,
      this.httpOptions
    );
  }
}
