import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';;
import { BackendService, AuthService } from '../../services';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {

  errors: any = {};
  user: any = {};
  submitted: boolean = false;

  constructor(protected backend: BackendService,
              protected cd: ChangeDetectorRef,
              private auth: AuthService) {
  }

  login(): void {
    this.errors = {};
    this.submitted = true;
    this.backend.login(this.user).subscribe(
      (user) => this.auth.login(user),
      errors => {
        this.errors = errors;
        this.submitted = false;
        this.cd.detectChanges();
      }
    );
  }
}
