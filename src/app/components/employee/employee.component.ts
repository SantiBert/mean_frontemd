import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../models/employee';

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

  resetEmployee(form:NgForm){
    form.reset();
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
    if(form.value._id){
      this.employeService.putEmployee(form.value).subscribe(
        (res) => {
          this.getEmployee();
          form.reset();
        },
        (err) => console.error(err)
      )
    } else {
      console.log(form.value)
      this.employeService.createEmployee(form.value).subscribe(
      (res) => {
        this.getEmployee();
        form.reset();
      },
      (err) => console.error(err)

    )
    }
  }
  deleteEmployee(id:string){
    if (confirm('¿Estas seguro?')){
      this.employeService.deleteEmployee(id).subscribe(
        res => {
          this.getEmployee()
        },
        err => console.error(err)
      )
    }
  }

  editEmployee(employee:Employee){
    this.employeService.selectedEmployee = employee;
  }
}
