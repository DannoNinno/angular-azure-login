import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/authControl.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Autenticando...</p>`,
  providers: [AuthService],
})
export class AuthComponent {
  constructor(public authService: AuthService) {}
}
