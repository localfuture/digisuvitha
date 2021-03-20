import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import {DigiService} from '../digi.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  formGroup: any;
  titleAlert: string = 'This field is required';
  post: any = '';

  constructor(private formBuilder: FormBuilder, private digiService: DigiService, public router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.setChangeValidate()
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required, Validators.maxLength(50)]],
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail, Validators.maxLength(50)],
      'phone': [null, [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.max(9999999999)]],
      'gender': [null, Validators.required],
      'age': [null, [Validators.required, Validators.max(120)]],
      'validate': ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate: string) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  checkPassword(control: { value: any; }) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control: { value: string; }) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPhone() {
    return this.formGroup.get('phone').hasError('required') ? 'Field is required':
      this.formGroup.get('phone').hasError('pattern') ? 'Not a valid phonenumber':
        this.formGroup.get('phone').hasError('max') ? 'Exceeds length': '';
  }

  getErrorGender() {
    return this.formGroup.get('gender').hasError('required') ? 'Field is required':'';
  }

  getErrorAge() {
    return this.formGroup.get('age').hasError('required') ? 'Field is required':
     this.formGroup.get('age').hasError('max') ? 'Exceeds Limit': '';
  }

  onSubmit(post: any) {
    const mockUserData = {
      "UserName": post.name,
      "Email": post.email,
      "Phone": post.phone.toString(),
      "Gender": post.gender,
      "Age": post.age
     };

     this.digiService.createMockUser(mockUserData).subscribe((Response: any) => {
      Swal.fire(
        'Created!',
        'Mock User created successfully.',
        'success'
      );
      this.router.navigate(["/"]);
     })
  }

}
