import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../../models/Task';
import { JsonplaceholderService } from '../../services/jsonplaceholder.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  // Для того чтобы ожидать данные с родительского компанента
  @Input() task: Task;
  // Декораторы для прокидывания данных вверх в родитель listcomponent
  @Output() delete = new EventEmitter()
  @Output() toggleDone = new EventEmitter()
  @Output() edit = new EventEmitter()
  constructor(
    public server: JsonplaceholderService,
  ) { }

  ngOnInit() {
  }
  deleteOneTask() {
    // Generate Event
    this.delete.emit(this.task.id);
  }
  markOneTaskToggle() {
    this.toggleDone.emit(this.task.id);
  }
  editOneTask() {
    // Object.assign - копирование объекта я так понял это какой то мерж полей объектов в один
    const updateTask = Object.assign({}, this.task);
    this.edit.emit(updateTask);
  }
}
