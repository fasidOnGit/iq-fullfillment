import { Component, OnInit } from '@angular/core';
import {userJson} from "../../data/user-json";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  title = 'TASK DETAILS';
  dtOptions: DataTables.Settings = {};
  dtTrigger: any;
  users = userJson;
  isModify: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
  }

  onRoute(modify: boolean) {
    this.isModify = modify;
    if(this.isModify == true) {
      this.router.navigate(['/pages/task/edit']).then(r => {
        console.log('Navigatd to Route Edit', r);
      });
    } else  {
      this.router.navigate(['/pages/task/add']).then(r => {
        console.log('Navigatd to Route Add', r);
      });
    }
  }

}
