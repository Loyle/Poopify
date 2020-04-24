import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {

  clicked = false;
  search = '';

  constructor() {}

  ngOnInit(){}

  getSearch(data){
    this.search = data.target.value;
    alert(this.search);
  }
}
