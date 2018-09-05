import {Component, OnInit, ViewChild} from '@angular/core';
import { JsonplaceholderService } from '../../services/jsonplaceholder.service';
import { Task } from '../../models/Task';
import { FlashMessagesService } from 'angular2-flash-messages';
import {current} from '../../../../node_modules/codelyzer/util/syntaxKind';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  isEdit = false;
  title: string;
  currentTask: Task;
  @ViewChild('form') form;
  constructor(
    public server: JsonplaceholderService,
    private _flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    // Подписываемсся на редактирование
    this.server.editingTask.subscribe((task: Task) => {
      if (task.id > 0) {
        this.isEdit = true;
        this.title = task.title;
        this.currentTask = task;
      }
    });
  }
  addTask() {
    const newTask = {
      userId: 1,
      completed: false,
      title: this.title};
    // Add Task
    this.server.addTask(newTask).subscribe((data: Task) => {
      console.log('Add Task', data);
      this.form.reset();
      this.server.emitNewTask(data);
      this._flashMessage.show('Success Add Task! ' + data.title,
        {cssClass: 'alert-success', closeOnClick: true, showCloseBtn: true, timeout: 3000 });
    }, (error) => {
      this._flashMessage.show('Error Add Task! ' + error.message,
        {cssClass: 'alert-danger', closeOnClick: true, showCloseBtn: true, timeout: 3000 });
    });
  }
  editTask() {
    if (this.title !== this.currentTask.title) {
      this.currentTask.title = this.title;
      this.server.editTask(this.currentTask).subscribe( (task: Task) => {
        this.form.reset();
        this.server.emitUpdateTask(task);
        this._flashMessage.show('Success! Task - ' + task.title + ' is edited.',
          {cssClass: 'alert-success', closeOnClick: true, showCloseBtn: true, timeout: 3000 });
      }, (error) => {
        this._flashMessage.show('Error Edit Task! ' + error.message,
          {cssClass: 'alert-danger', closeOnClick: true, showCloseBtn: true, timeout: 3000 });
      });
    } else {
      this._flashMessage.show('Warning! Nothing change!',
        {cssClass: 'alert-danger', closeOnClick: true, showCloseBtn: true, timeout: 3000 });
    }
  }
}
