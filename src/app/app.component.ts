import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeService } from './employe.service';
import { Employee } from './employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  public employees!: Employee[];
  public editEmployee: Employee | undefined;

  constructor(private employeeService: EmployeService) { }

  ngOnInit(): void {
    this.getEmployees();

  }
 //Methode permettant de lister tous les employés
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
 // Mthode pertmettant d'ajouter un nouveau employé
  public OnAddEmployee(addForm: NgForm) :void {
    document.getElementById('add-employee-form')?.click();  // click sur close

    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees(); // appel pour afficher la liste des employés
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
      );
   
  }
  // Mthode pertmettant de modifier un employe
  public OnUpdateEmployee(employee: Employee) :void {
      this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees(); // appel pour afficher la liste des employés
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
      );
   
  }

  // Methode permettant de créer le button modal et de tester le mode
  public onOpenModal(employee: Employee, mode: string) : void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');   // creation du button
    button.type = 'button';                           // de type button
    button.style.display = 'none'; 
    button.setAttribute('data-toggle', 'modal');     // button modal

    if(mode === 'add') {
    button.setAttribute('data-target', '#addEmployeeModal');  // recuperation du formulaire ajout
    }

    if(mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal'); // edit
    }

    if(mode === 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal'); // delete
    }
    container?.appendChild(button);
    button.click();
  }

}
