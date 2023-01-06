import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles:[
    `
    #mapa{
      width:100%;
      height:100%;
    }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
  const map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center:[-68.52515250931933, -31.537001144820408], // starting position [lng, lat]
    zoom: 16, // starting zoom
    });
  }

}
