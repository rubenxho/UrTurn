import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  ngOnInit() {
    $('.showtoast').click(function () {
      $('.toast').toast('show');
    });
  }
  title = 'urturn';
}
