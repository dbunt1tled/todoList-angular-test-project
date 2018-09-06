import { Component, OnInit } from '@angular/core';
import {JsonplaceholderService} from '../../services/jsonplaceholder.service';
import {Task} from '../../models/Task';
import {TodoCount} from '../../models/todo-count';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  todoLength: TodoCount;
  lastMessage: string;
  constructor(
    private server: JsonplaceholderService,
  ) { }

  ngOnInit() {
    // Подпишимся на обновление количества тасков
    this.server.taskCount.subscribe((length: TodoCount ) => {
      this.todoLength = length;
    });
    // Подпишимся на новый таск
    this.server.newTask.subscribe( (task: Task) => {
      this.lastMessage = task.title;
    });
  }

}
