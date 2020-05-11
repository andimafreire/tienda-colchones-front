import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { 
  BackendService, 
  ToastService,
} from '../../../services';

@Component({
  selector: 'ngx-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() productModel: any = {};
  @Output() confirm: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  
  productForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  filename: string = '';

  constructor(private toast: ToastService,
              private backend: BackendService) {}

  ngOnInit(): void {
    const model: boolean = this.productModel._id ? true : false;

    if (this.productModel.picture) this.filename = this.productModel.picture;

    this.productForm = new FormGroup({
      title: new FormControl(model ? this.productModel.title : '', Validators.required),
      price: new FormControl(model ? this.productModel.price : '', Validators.required),
      type: new FormControl(this.productModel.type),
      picture: new FormControl(model ? this.productModel.picture : '', Validators.required),
      description: new FormControl(model ? this.productModel.description : '', Validators.required),
      highlighted: new FormControl(model ? this.productModel.highlighted : false),
    });
    this.productForm.patchValue(model ? this.productModel.highlighted : false); 
  }

  get title() { return this.productForm.get('title'); }
  get price() { return this.productForm.get('price'); }
  get picture() { return this.productForm.get('picture'); }
  get description() { return this.productForm.get('description'); }
  get highlighted() { return this.productForm.get('highlighted'); }

  uploadFile(event): void {
    const file = (event.target as HTMLInputElement).files[0];

    this.productForm.patchValue({
      picture: file,
    });
    this.filename = file.name;
    this.productForm.get('picture').updateValueAndValidity();
  }

  onSubmit(): void {
    if (!this.submitted) this.productForm.markAllAsTouched();
    this.submitted = true;

    if (this.productForm.valid) {
      this.loading = true;

      if (this.productModel._id) this.editProduct();
      else this.addProduct();
    }
  }

  addProduct(): void {
    new FormData();
    this.backend.addProduct(this.getFormData(this.productForm.value)).subscribe(
      () => {
        this.toast.showSuccessMsg('Producto añadido con éxito.');
        this.productForm.reset({ highlighted: false, type: this.productModel.type });
        this.filename = '';
        this.submitted = false;
        this.loading = false;
        this.confirm.emit();
      },
      error => this.setError(error)
    );
  }

  editProduct(): void {
    this.backend.editProduct(this.getFormData({...this.productForm.value}), this.productModel._id).subscribe(
      () => {
        this.toast.showSuccessMsg('Producto editado correctamente.');
        this.submitted = false;
        this.loading = false;
        this.confirm.emit();
      },
      (err) => {
        if (err.details[0] && err.details[0].productId){
          err.details = err.details[0].productId;
          this.cancel.emit();
        } else this.setError(err);
      }
    ); 
  }

  getFormData(data: any): FormData {
    const formData = new FormData;
    
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    return formData;
  }

  setError(error: any): void {
    if (error.statusCode === 400 && !error.non_field_errors) {
      error.details.forEach(detail => {
        const key = Object.keys(detail)[0];
        this.productForm.controls[key].setErrors({'server': detail[key]});
      });
    }
    this.loading = false;
  }
}
