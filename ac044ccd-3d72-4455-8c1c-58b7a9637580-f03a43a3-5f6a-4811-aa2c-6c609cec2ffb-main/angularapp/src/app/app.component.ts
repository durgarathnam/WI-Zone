import { Component } from '@angular/core';
import { UserStoreService } from './helpers/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angularapp';
  public constructor(public service:UserStoreService){}
}
