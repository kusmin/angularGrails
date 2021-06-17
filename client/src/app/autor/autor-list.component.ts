import {Component, OnInit} from '@angular/core';
import {Autor} from '../core/autor/autor';
import {AutorService} from '../core/autor/autor.service';

@Component({
  selector: 'autor-list',
  templateUrl: './autor-list.component.html'
})
export class AutorListComponent implements OnInit {

  autorList: Autor[] = [];

  constructor(private autorService: AutorService) { }

  ngOnInit() {
    this.autorService.list().subscribe((autorList: Autor[]) => {
      this.autorList = autorList;
    });
  }
}
