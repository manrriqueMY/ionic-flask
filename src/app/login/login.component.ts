import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { login } from '../services/servicios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials = {
    username: "manrrique1",
    password: "abc123"
  }
  constructor(private router: Router, private ionLoader: LoaderService) { }

  ngOnInit() {}
  
  teclado = (event) => {
    this.credentials[event.target.name] = event.target.value;
  }
  registarse = (event) => {
    event.preventDefault();
    this.router.navigate(["/register"]);
  }

  loguearse = async(event) => {
    event.preventDefault();
    await this.ionLoader.showLoader();
    var logn = await login(this.credentials);
    await this.ionLoader.hideLoader();
    if(logn){
      this.router.navigate(["/home"]);
    }
  }
}
