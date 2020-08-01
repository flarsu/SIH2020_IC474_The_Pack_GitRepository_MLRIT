import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-mode-page',
  templateUrl: './mode-page.component.html',
  styleUrls: ['./mode-page.component.css']
})
export class ModePageComponent implements OnInit {

  constructor() { }
public display = false;

  ngOnInit(): void {

  }

  public displayChange() {
    this.display = !this.display;
  }
}
