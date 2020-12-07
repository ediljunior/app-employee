import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from "@angular/forms";
import { Employee } from 'src/app/models/employee';

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  selectedEmployee: Employee;
  employees: Employee[];

  constructor(private employeeService: EmployeeService) {
    this.selectedEmployee = new Employee();
    this.employees = [];
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  addEmployee(form: NgForm){
    if(form.value.name === null || form.value.name.trim() === ''){
      M.toast({html: 'Enter your name'});
      return;
    }

    if(form.value.id){
      this.employeeService.putEmployee(form.value)
        .subscribe(res =>{
          this.resetForm(form);
          M.toast({html: 'Updated Successfuly'});
          this.getEmployees();
        })
    }else{
        this.employeeService.postEmployee(form?.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Save Successfuly'});
        this.getEmployees();
      });
    }
  }

  getEmployees(form?: NgForm){
    this.employeeService.getEmployees()
    .subscribe(res => {
      this.employees = res as Employee[];
    });
  }

  editEmployee(employee: Employee){
    this.selectedEmployee = employee;
  }

  deleteEmployee(id: number){
    if(confirm('Are you sure you want to delete it?')){
      this.employeeService.deleteEmployee(id)
      .subscribe(res =>{
        M.toast({html: 'Deleted Successfuly'});
        this.getEmployees();
      });
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.selectedEmployee = new Employee();
      this.getEmployees();
    }
  }

}
