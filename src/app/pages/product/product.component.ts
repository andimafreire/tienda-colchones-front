import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService, ToastService, AuthService } from '../../services';
import {MatPaginator} from '@angular/material/paginator';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['product.component.scss'],
})

export class ProductComponent implements OnInit {

  product: any = {};
  productId: string;
  user: any;
  backendUrl:string = environment.backendUrl;
  editMode: boolean = false;
  loading: boolean = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private backend: BackendService,
              private dialogService: NbDialogService,
              private toast: ToastService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.user = this.auth.getUser();
      this.productId = routeParams.id;
      this.getProduct();
    });
  }

  getProduct(): void {
    this.backend.getProduct(this.productId).subscribe(
      result => {
        this.product = result;
        this.loading = false;
      },
      (err) => {
        if (err.details[0] && err.details[0].productId) err.details = err.details[0].productId;

        this.toast.showError(err);
        this.router.navigate(['']);
        this.loading = false;
      }
    ); 
  }

  editProduct(): void {
    this.editMode = true;
  }

  productEdited(): void {
    this.editMode = false;
    this.getProduct();   
  }

  deleteProduct(): void {
    this.dialogService
      .open(ConfirmDialogComponent, { // Open confirm dialog
        context: {
          message: 'El elemento seleccionado será eliminado.',
        },})
      .onClose.subscribe(confirm => {
        if (confirm) {
          this.loading = true;
          this.backend.deleteProduct("this.produdsfdsct._id").subscribe(
            () => {
              this.toast.showSuccessMsg('Producto eliminado correctamente.'); 
              this.router.navigate(['']);
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
