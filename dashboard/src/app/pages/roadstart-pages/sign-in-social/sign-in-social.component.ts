import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/users';
@Component({
  selector: 'page-sign-in-social',
  templateUrl: './sign-in-social.component.html',
  styleUrls: ['./sign-in-social.component.scss']
})
export class PageSignInSocialComponent implements OnInit {
  pageTitle: string = 'כניסה';
  data: User;

  constructor(private router: Router, private userService : UserService) {}

  ngOnInit() {}

  onSubmit(username,pass) {
    this.userService.getUser(username,pass).subscribe(data => {
      if(data)
        this.router.navigate(['/default-layout/dashboard']);
    });
  }

}



