import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith} from 'rxjs/operators';
import {FormControl} from "@angular/forms";
import {DataService, Person} from "../../../service/data.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  selectTaskLabel = 'Select Task';
  people: Person[] = [];
  selectedPeople = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPeople()
      .pipe(map(x => x.filter(y => !y.disabled)))
      .subscribe((res) => {
        this.people = res;
        this.selectedPeople = [this.people[0].id, this.people[1].id];
      });
  }

}
