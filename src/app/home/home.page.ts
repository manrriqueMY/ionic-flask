import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { isLoggin, puntuation } from '../services/servicios';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  user = {
    username: "",
  }
  puntos = 0;
  tiempo = "00:00:00";
  constructor(private router:Router, private ionLoader: LoaderService) {}
  ngOnInit() {
    this.usLoggin();
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  usLoggin = async() => {    
    await this.ionLoader.showLoader();
    var login = await isLoggin();
    await this.ionLoader.hideLoader();
    if(!login){
      this.router.navigate(["/login"]);
    }
    this.usPuntuation();
  }

  usPuntuation = async() => {
    await this.ionLoader.showLoader();
    var {puntuacion, tiempo} = await puntuation();
    await this.ionLoader.hideLoader();
    this.puntos = puntuacion;
    this.tiempo = tiempo;
  }
  loggout = (event) => {
    event.preventDefault();
    localStorage.removeItem("access_token");
    this.router.navigate(["/login"]);
  }

  preguntas = () => {
    this.router.navigate(["/preguntas"]);
  }

  leaderboard = () => {
    this.router.navigate(["/leaderboard"]);
  }
}
