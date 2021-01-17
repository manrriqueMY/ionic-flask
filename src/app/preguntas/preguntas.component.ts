import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { preguntas, spuntuacion, uri_base } from '../services/servicios';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
})
export class PreguntasComponent implements OnInit {
  questions = [];
  indice = 0;
  time = 0;
  tiempo = "00:00:00";
  punto = 0;
  paginate = "";
  question = {
    _id:"0",
    alternativas:[],
    categoria:"",
    descripcion:"",
    images:[],
    respuesta:"",
    tema:"",
    tipo_materia:""
  }
  respuesta = "";

  uri_base = "";
  constructor(private router: Router, private ionLoader: LoaderService) { }

  ngOnInit() {
    this.upPreguntas();
    this.temporizador();
    this.uri_base = uri_base;
  }
  temporizador = () => {
    var s = 0, h = 0, m = 0;
    setInterval(() => {      
      var hAux, mAux, sAux;
      s++;
      if (s>59){m++;s=0;}
      if (m>59){h++;m=0;}
      if (h>24){h=0;}

      if (s<10){sAux="0"+s;}else{sAux=s;}
      if (m<10){mAux="0"+m;}else{mAux=m;}
      if (h<10){hAux="0"+h;}else{hAux=h;}

      this.tiempo = `${hAux}:${mAux}:${sAux}`;
    },1000);
  }
  cancelar = (event) => {
    event.preventDefault();
    this.router.navigate(["/home"]);
  }
  upPreguntas = async() => {
    await this.ionLoader.showLoader();
    this.questions = await preguntas();
    await this.ionLoader.hideLoader();
    if(this.questions){
      this.question = {...this.questions[this.indice]};
    }
  }
  contestando = (event) => {
    this.respuesta = event.target.value;
  }

  validar = async() => {
    if(this.indice < this.questions.length - 1){
      if(this.respuesta == this.question.respuesta){
        this.punto += 1;
      }
      this.indice += 1;
      this.question = this.questions[this.indice];
      this.respuesta = "";
    }
    else{
      var res = await spuntuacion({"puntuacion":this.punto, "tiempo":this.tiempo});
      if(res){
        this.router.navigate(['/leaderboard']);
      }
      else{
        this.router.navigate(['/login']);
      }
    }
  }
}
