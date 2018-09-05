import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderService {

  configUrl = 'https://jsonplaceholder.typicode.com/todos/';
  // Создаем объект BehaviorSubject который будет возвращать объект тип Task
  private taskSource = new BehaviorSubject<Task>({id: 0, title: '', userId: 0, completed: false});
  private taskCountSource = new BehaviorSubject(200);
  private editTaskSource = new BehaviorSubject<Task>({id: 0, title: '', userId: 0, completed: false});
  private updateTaskSource = new BehaviorSubject<Task>({id: 0, title: '', userId: 0, completed: false});
  // Создаем объект подпичиков
  newTask = this.taskSource.asObservable();
  taskCount = this.taskCountSource.asObservable();
  editingTask = this.editTaskSource.asObservable();
  updatingTask = this.updateTaskSource.asObservable();
  constructor(
    public http: HttpClient
  ) { }

  getTasks() {
    return this.http.get(this.configUrl);
  }

  deleteTask(id: string) {
    return this.http.delete(this.configUrl + id);
  }
  markTask(id: string, data) {
    return this.http.patch(this.configUrl + id, data);
  }
  addTask(task: Task) {
    return this.http.post(this.configUrl, task);
  }
  editTask(task: Task) {
    return this.http.put(this.configUrl + task.id, task);
  }
  // Генерация события для подпичика
  emmitUpdateCount(length: number) {
    this.taskCountSource.next(length);
  }
  emitNewTask(task: Task) {
    this.taskSource.next(task);
  }
  emitEditTask(task: Task) {
    this.editTaskSource.next(task);
  }
  emitUpdateTask(task: Task) {
    this.updateTaskSource.next(task);
  }
}
