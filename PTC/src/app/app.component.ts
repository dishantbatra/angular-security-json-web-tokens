import { Component } from '@angular/core';
import { AppUserAuth } from './models/app-user-auth.model';
import { SecurityService } from './security/security.service';
@Component({
  selector: 'ptc-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: String = 'Paul\'s Training Company';
  securityObject: AppUserAuth = null;
  constructor(private securityService: SecurityService) {
    this.securityObject = securityService.securityObject;
  }

  logout(): void {
    this.securityService.logout();
  }
}
