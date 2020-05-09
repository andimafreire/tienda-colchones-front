import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'ngx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['product-list.component.scss'],
})

export class ProductListComponent implements OnInit {

  productType: string;
  page: number = 1;
  pageSize: number = 2;
  length: number = 0;
  loading: boolean = true;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['actions', 'title', 'price',];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private backend: BackendService) {
   
  }

  ngOnInit(): void {    
    this.route.url.subscribe(url => {
      if (url[0]) this.productType = url[0].path;
      else this.productType = 'destacados';
      
      this.getProductList();
    });
    
  }

  getProductList(): void {
    this.backend.getProductList(this.productType, this.page.toString(), this.pageSize.toString())
      .subscribe(result => {
        this.dataSource.data = result.products;
        this.length = result.count;
        this.loading = false;
    });
    
  }

  pageChanged(event){
    this.loading = true;
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.getProductList();
  }

  clickRow(row) {
    console.log(row)
  }

  editProduct(row) {
    console.log("edit")
  }

  deleteProduct(row) {
    console.log("delete")
  }

}
