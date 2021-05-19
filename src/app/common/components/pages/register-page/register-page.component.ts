import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass']
})
export class RegisterPageComponent implements OnInit {

    form: FormGroup;
    aSub: Subscription;

  constructor(private auth: AuthService, private router: Router){
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
    this.aSub = new Subscription();
  }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit(): void{
    this.form.disable();

    this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/auth/login'], {queryParams: {registered: true}});
      },
      (error) => { 
        this.form.enable();
      }
    );
  }

}
