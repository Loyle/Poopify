import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  clicked = false;
  search = '';
  constructor() { }

  ngOnInit(): void {
  }

  getSearch(event){
    this.search += event.target.value;
    alert(this.search);
  }


}
