import { Injectable } from '@angular/core';
import { 
    NbGlobalLogicalPosition, 
    NbToastrService, 
    NbComponentStatus 
} from '@nebular/theme';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    statusTypes: NbComponentStatus[] = [
        'primary',
        'success',
        'info',
        'warning',
        'danger',
    ];
    successConfig: any = {
        status: this.statusTypes[1],
        destroyByClick: true,
        duration: 3000,
        hasIcon: true,
        position: NbGlobalLogicalPosition.BOTTOM_END,
        preventDuplicates: false,
        allowHtml: true,
        icon: 'checkmark-circle-2-outline',
        iconPack: 'eva'
    };
    errorConfig: any = {
        status: this.statusTypes[4],
        destroyByClick: true,
        hasIcon: true,
        position: NbGlobalLogicalPosition.BOTTOM_END,
        preventDuplicates: false,
        allowHtml: true,
        icon: 'alert-circle-outline',
        iconPack: 'eva'
    };
    
    constructor(private toastrService: NbToastrService) { }

    showSuccessMsg(msg: string): void {
        this.toastrService.show(
            '',
            msg,
            this.successConfig,
        );
    }

    showError(error: any): void {
        const duration = Object.keys(error).length * 4000,
            config = {...this.errorConfig, duration};
        var body: string = '';

        if (error.details) {
            body = error.details;
        } else if (error.non_field_errors) {
            body = error.non_field_errors;
        }
        if (body !== '') {
            this.toastrService.show(
                body,
                'Error',
                config,
            );
        }
    }
}