import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService, ToastService, AuthService } from '../../services';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { EditProductDialogComponent } from '../components/edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'ngx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['product-list.component.scss'],
})

export class ProductListComponent implements OnInit {

  productType: string;
  user: any;
  page: number = 1;
  pageSize: number = 5;
  length: number = 0;
  loading: boolean = true;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['title', 'price',];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private router: Router,
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
      this.user = this.auth.getUser();
      
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

  pageChanged(event): void {
    this.loading = true;
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.getProductList();
  }

  clickRow(row: any): void {
    this.router.navigate([`/${row.type}/${row._id}`]);
  }

  editProduct(row: any): void {
    this.dialogService
      .open(EditProductDialogComponent, {
        context: {
          product: row,
        },
        hasScroll: true,
      })
      .onClose.subscribe(confirm => {
        if (confirm) this.getProductList();
      });
  }

  deleteProduct(row: any): void {
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
              (err) => {
                if (err.details[0] && err.details[0].productId) err.details = err.details[0].productId;
    
                this.toast.showError(err);
                this.loading = false
              }
            );
          }
      });
  }
}
