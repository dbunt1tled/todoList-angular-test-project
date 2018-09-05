import { Component } from "@angular/core";
import {User} from "../../models/User";

@Component({
  selector: 'app-myfirstcomponent',
  templateUrl: './myfirstcomponent.component.html',
  styleUrls: ['./myfirstcomponent.component.css'],
})

export class MyfirstcomponentComponent {
  header = 'Welcome my component';
  name: string = 'Denis';
  show: boolean = false;
  imageUrl: string = 'https://picsum.photos/200/300';
  user: User = {
    name: 'Denis',
    age: 29
  }
  users: User[] = [
    {
      name: 'Denis',
      age: 29
    },
    {
      name: 'Ivan',
      age: 30,
    },
  ];
  constructor() {
    console.log(this.user);
    setTimeout( () => this.userNameChanges('+'), 1000);
    setTimeout( () => this.showToggle(), 4000);
    setTimeout( () => this.addUser(), 3000);
  }
  showToggle() {
    this.show = !this.show;
  }
  userNameChanges(symbol: string): void {
    this.user.name = this.user.name.toUpperCase() + symbol;
  }
  addUser() {
    this.users.push({name : 'Vasya', age : 21});
  }
}
