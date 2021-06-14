import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(){
    this.employeService.getEmployees().subscribe(
      res => {
        this.employeService.employees = res;
      },
      err => console.error(err)
    )
  }
  addEmployee(form:NgForm){
    this.employeService.createEmployee(form.value).subscribe(
      res => this.getEmployee(),
      err => console.error(err)

    )
  }
}
