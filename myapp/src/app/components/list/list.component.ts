import { Component, OnInit } from '@angular/core';
import { JsonplaceholderService } from '../../services/jsonplaceholder.service';
import { Task } from '../../models/Task';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tasks: Task[];

  constructor(
    public server: JsonplaceholderService,
    private _flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    // Get All Tasks
    this.server.getTasks().subscribe((data: Task[]) => {
      if (data) {
        this.tasks = data;
      }
    }, error => {
      console.log(error);
    });
    // Add New Task - Подписываемся на наш эвент
    this.server.newTask.subscribe((data: Task) => {
      console.log('Observer New', data);
      if (this.tasks) {
        this.tasks.unshift(data);
        this.server.emmitUpdateCount(this.tasks.length);
      }
    });
    // Подписываемся на на обновления таска
    this.server.updatingTask.subscribe( (data: Task) => {
      console.log('Observer Edit', data);
      if (this.tasks) {
        console.log(data);
        this.tasks = this.tasks.map( (item) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        });
      }
    });
  }
  identify(index) {
    return index;
  }
  deleteTask(id) {
    const idtask = id.toString();
    this.server.deleteTask(idtask).subscribe( (data) => {
      console.log('delete', idtask, data);
      this.tasks = this.tasks.filter( task => task.id !== id );
      this._flashMessage.show('Success deleted Task', {cssClass: 'alert-success', closeOnClick: true, showCloseBtn: true, timeout: 3000 });
      this.server.emmitUpdateCount(this.tasks.length);
    }, (error) => {
      this._flashMessage.show('Error deleted Task - ' + error.message,
        {cssClass: 'alert-danger', closeOnClick: true, showCloseBtn: true, timeout: 3000 }
        );
    });
  }
  editTask(task: Task) {
    this.server.emitEditTask(task);
  }
  toggleDoneTask(id) {
    const idtask = id.toString();
    let status = false;
    this.tasks.forEach((task) => {
      if (task.id === id) {
        status = !task.completed;
        task.completed = status;
      }
    } );
    const dataChange = {
      completed: status,
    }
    this.server.markTask(idtask, dataChange).subscribe( (data) => {
      console.log('status - ', idtask, data);
    });
  }
}
