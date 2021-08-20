import {Component, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';

export interface Task {
  id: string;
  name: string;
  task: string;
  deadline: any;
}

let taskList: Task[] = [];

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  displayedColumns: string[] = ['id', 'name', 'task', 'deadline'];
  dataSource = [...taskList];

  @ViewChild(MatTable) table!: MatTable<Task>;

  taskRef = new FormGroup({
    id:new FormControl(),
    name:new FormControl(),
    task:new FormControl(),
    deadline:new FormControl()
  });

  addData() {
    let newTaskInit = this.taskRef.value;
    console.log(newTaskInit);
    let newTask = <Task>{id: newTaskInit.id, name:newTaskInit.name, task: newTaskInit.task, deadline: newTaskInit.deadline};
    
    this.dataSource.push(newTask);
    this.table.renderRows();
  }

  resetForms() {
    this.taskRef.setValue({id:"", name: "", task: "", deadline: ""});
  }
}
