import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-venture',
  templateUrl: './add-venture.component.html',
  styleUrls: ['./add-venture.component.css']
})
export class AddVentureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
