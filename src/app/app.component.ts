import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeService } from './employe.service';
import { Employee } from './employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  public employees!: Employee[];

  constructor(private employeeService: EmployeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {

    this.employeeService.getEmployees().subscribe(
       (response: Employee[]) => {
        this.employees = response;
       },
       (error: HttpErrorResponse) => {
        alert(error.message);
       }
       );    
  }


}
