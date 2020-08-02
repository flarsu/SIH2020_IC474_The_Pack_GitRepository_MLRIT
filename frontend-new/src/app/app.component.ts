import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      if (this.askUserToUpdate()) {
        window.location.reload();
      }
    });
  }
  title = 'Eureka 1.0';

  askUserToUpdate(): boolean {
      return confirm('Please update to new version of this app.');
  }
}
