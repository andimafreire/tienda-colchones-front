import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService, ToastService, AuthService } from '../../services';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
  displayedColumns: string[] = ['title', 'price',];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private backend: BackendService,
              private dialogService: NbDialogService,
              private toast: ToastService,
              private auth: AuthService) {
   
  }

  ngOnInit(): void {
    if (this.auth.getUser()) this.displayedColumns.unshift('actions');
    this.route.url.subscribe(url => {
      if (url[0]) this.productType = url[0].path;
      else this.productType = 'destacados';
      
      this.getProductList();
    });
  }

  getProductList(): void {
    this.backend.getProductList(this.productType, this.page.toString(), this.pageSize.toString())
      .subscribe(result => {
        console.log(result)
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
    this.dialogService
      .open(ConfirmDialogComponent, { // Open confirm dialog
          context: {
              message: 'El elemento seleccionado será eliminado.',
          },})
      .onClose.subscribe(confirm => {
          if (confirm) {
            this.loading = true;
            this.backend.deleteProduct(row._id).subscribe(
              () => {
                this.toast.showSuccessMsg('Producto eliminado correctamente.');
                
                if (this.dataSource.data.length === 1 && this.page > 1){
                  this.paginator.previousPage();
                } else this.getProductList();         
              },
              () => this.loading = false  // Error
            );
          }
      });
  }

}
