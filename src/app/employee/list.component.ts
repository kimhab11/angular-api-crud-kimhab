import { Component, OnInit } from '@angular/core';

import { EmpService } from '../_services/emp.service';
import { Emp } from '../_models/emp';
import { first } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employees!: Emp[];
  totalrow: number = 0;

  constructor(private empService: EmpService,) { }

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee() {
    this.empService.getAll().pipe(first())
      .subscribe(d => {
        this.employees = d;
        this.totalrow = d.length;
      });
  }

  delete(emp: Emp) {
    this.empService.delete(emp.empId).pipe(first())
      .subscribe(() => {
        this.loadEmployee();
      })
  }

}
