import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  public display = false;

  ngOnInit(): void {
  }

  public displayChange() {
    this.display = !this.display;
  }
}
