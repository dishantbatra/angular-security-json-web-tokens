import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user.model';
import { AppUserAuth } from '../models/app-user-auth.model';
import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  returnUrl: string;
  constructor(private securityService: SecurityService, private route: ActivatedRoute, private router: Router) {
   this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  ngOnInit() {

  }

  login() {
    this.securityService.login(this.user).subscribe(resp => {
      this.securityObject = resp;
      if (this.returnUrl) {
        this.router.navigateByUrl(this.returnUrl);
      }
    }, () => {
      // Initialize Security Object To Display Error Message
      this.securityObject = new AppUserAuth();
    }
    );
  }

}
