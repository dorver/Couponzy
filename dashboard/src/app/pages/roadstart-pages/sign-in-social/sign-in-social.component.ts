import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'page-sign-in-social',
  templateUrl: './sign-in-social.component.html',
  styleUrls: ['./sign-in-social.component.scss']
})
export class PageSignInSocialComponent implements OnInit {
  pageTitle: string = 'כניסה';

  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.router.navigate(['/default-layout/dashboard']);
  }

}
