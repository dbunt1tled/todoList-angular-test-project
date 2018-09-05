import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  todo: Todo = {
    id: 0,
    title: '',
    text: '',
    complete: false,
  };
  // Декоратор ViewChild
  // Сделано для того чтоб сразу связать форму во вьюхе и этим объектом и не передовать текущую форму в функцию addToDo
  @ViewChild('form') form;

  constructor() { }

  ngOnInit() {
    this.todos = [
      {
        id: 1,
        title: 'Task 1',
        text: 'My task text for Task 1',
        complete: false,
      },
      {
        id: 2,
        title: 'Task 2',
        text: 'My task text for Task 2',
        complete: true,
      },
    ];
  }
  // Delete Task
  deleteTask(id: number) {
    this.todos = this.todos.filter((task) => task.id !== id );
  }
  // Complete Task
  completeTask(id: number) {
    this.todos.forEach((task) => {
      if (task.id === id) {
        task.complete = true;
      }
    } );
  }
  // TrackBy отслеживать только конкретно измененный объект
  identify(index) {
    // console.log(index);
  }
  // Submit Form Add Task
  addToDo() {
    console.log(this.form);
    const newTask = {
      id: (this.todos.length + 1),
      title: this.todo.title,
      text: this.todo.text,
      complete: this.todo.complete,
    };
    this.todos.unshift(newTask);
    this.form.reset();
  }
}
