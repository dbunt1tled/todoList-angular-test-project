
/*Component это переменная в ангуляр коре/**/
import { Component } from '@angular/core';
/* @Component декоратор
   selector Как будет называться компонетна
   templateUrl шаблон для компоненты
   styleUrls стиль для компоненты*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/*экспортируем нашу компопнету */
export class AppComponent {
  title = 'myfirstcomponent';
}
