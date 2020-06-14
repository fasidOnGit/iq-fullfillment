import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {userJson} from '../../../data/user-json';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  title = 'USER DETAILS';
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
      this.router.navigate(['/pages/user/edit']).then(r => {
        console.log('Navigatd to Route Edit', r);
      });
    } else  {
      this.router.navigate(['/pages/user/add']).then(r => {
        console.log('Navigatd to Route Add', r);
      });
    }
  }
}
