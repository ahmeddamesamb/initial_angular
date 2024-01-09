import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
  connexionForm!: FormGroup;
  submitted = false;
  currentUser: any;

  constructor(private formBuilder: FormBuilder,private authentification:AuthentificationService,private http:HttpClient) {

  }

  ngOnInit(): void {
    this.connexionForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.authentification.user$.subscribe(data=>{
      console.warn("user connect",data)
    })

  }

  get f() {
    return this.connexionForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.connexionForm.invalid) {
      return;
    }
    this.authentification.
    login(this.connexionForm.value)
  }
}


