import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ThemeModule } from '../@theme/theme.module';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbLayoutModule, NbAlertModule, NbInputModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAuthBlockComponent } from './auth-block/auth-block.component';
import { AuthRoutingModule } from './auth-routing.module';

const NB_MODULES = [
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
  NbAlertModule,
  NbIconModule,
];

@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    ...NB_MODULES,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    NbAuthBlockComponent,
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    NbAuthBlockComponent,
  ]
})
export class AuthModule {}
