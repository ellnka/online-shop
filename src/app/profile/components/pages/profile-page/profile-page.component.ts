import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/IUser';
import { UserService } from './../../../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass']
})
export class ProfilePageComponent implements AfterViewInit {
  isEditMode: boolean = false;
  user: IUser | undefined;
  aSub: Subscription = new Subscription();
  form: FormGroup= new FormGroup({
    name: new FormControl(null),
    surname: new FormControl(null),
    address: new FormControl(null),

    email: new FormControl(null),
    password: new FormControl(null),
    _id: new FormControl(null),
    __v: new FormControl(null),
  });;
  

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.aSub = this.userService.fetchCurrentUser().subscribe(
      (user: IUser) => {
        this.user = {
          name: user.name || "",
          surname: user.surname || "",
          address: user.address || "",
          ...user
        }; 
        this.form.setValue({
          ...user
        });
      },
      error => {
        // TODO: handle error
      });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();

    const user: IUser = this.form.value;
    user._id = this.form.value._id;
      
    this.aSub = this.userService.update(user).subscribe(
      user => {
        this.form.enable();
        this.isEditMode = false;
      },
      error => {
          // TODO: handle error
      }); 
  }
  
  onToggleMode() {
    this.isEditMode = !this.isEditMode;
    this.form.setValue({
      ...this.user
    });
  }

}



