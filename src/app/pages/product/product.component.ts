import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService, ToastService, AuthService } from '../../services';
import {MatPaginator} from '@angular/material/paginator';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['product.component.scss'],
})

export class ProductComponent implements OnInit {

  product: any = {};
  user: any;
  loading: boolean = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private backend: BackendService,
              private dialogService: NbDialogService,
              private toast: ToastService,
              private auth: AuthService) {
   
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.user = this.auth.getUser();
      this.getProduct(routeParams.id);
    });
  }

  getProduct(id: string): void {
    this.backend.getProduct(id).subscribe(
      result => {
        this.product = result;
        this.loading = false;
      },
      () => this.router.navigate([''])   //  In error case go to home page.
    ); 
  }

  editProduct(row) {
    console.log("edit")
  }

  deleteProduct() {
    this.dialogService
      .open(ConfirmDialogComponent, { // Open confirm dialog
          context: {
              message: 'El elemento seleccionado será eliminado.',
          },})
      .onClose.subscribe(confirm => {
          if (confirm) {
            this.loading = true;
            this.backend.deleteProduct(this.product._id).subscribe(
              () => {
                this.toast.showSuccessMsg('Producto eliminado correctamente.'); 
                this.router.navigate(['']);
              },
              () => this.loading = false  // Error
            );
          }
      });
  }

}
