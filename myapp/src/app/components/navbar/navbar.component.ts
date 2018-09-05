import { Component, OnInit } from '@angular/core';
import {JsonplaceholderService} from '../../services/jsonplaceholder.service';
import {Task} from '../../models/Task';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  todoLength: number;
  lastMessage: string;
  todoLengthCompleted: number;
  todoLengthUnCompleted: number;

  constructor(
    private server: JsonplaceholderService,
  ) { }

  ngOnInit() {
    // Подпишимся на обновление количества тасков
    this.server.taskCount.subscribe(length => {
      this.todoLength = length;
    });
    // Подпишимся на новый таск
    this.server.newTask.subscribe(task => {
      this.lastMessage = task.title;
    });
  }

}
