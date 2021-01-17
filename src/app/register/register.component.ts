import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { register } from '../services/servicios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  credentials = {
    username: "",
    password: ""
  }
  error = "";
  constructor(private router:Router, private ionLoader: LoaderService) { }
  ngOnInit() {}

  teclado = (event) => {
    this.credentials[event.target.name] = event.target.value;
  }
  loggearse = (event) => {
    event.preventDefault();
    this.router.navigate(["/login"]);
  }

  errores = (error) => {
    this.error = error;
  }

  registrarse = async (event) => {
    event.preventDefault();
    await this.ionLoader.showLoader();
    var regs = await register(this.credentials, this.errores);
    await this.ionLoader.hideLoader();
    if(regs){
      this.router.navigate(['/login']);
    }
  }
}
