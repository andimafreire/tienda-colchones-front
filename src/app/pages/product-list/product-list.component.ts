import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-shops',
  templateUrl: './product-list.component.html',
})

export class ProductListComponent implements OnInit {

  product: string;

  constructor(private route: ActivatedRoute,) {
   
  }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      if (url[0]) this.product = url[0].path;
      else this.product = 'destacados';
    });
  }

}
