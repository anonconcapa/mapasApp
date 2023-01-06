import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles:[
    `
    .mapa-container{
      width:100%;
      height:100%;
    }

    .row{
      background-color:white;

      position:fixed;
      bottom:50px;
      left:50px;
      padding:10px;
      z-index:999;
      width:400px;
    }

    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!:mapboxgl.Map;
  zoomLevel:number = 10;
  center: [number, number] = [-68.52515250931933, -31.537001144820408];

  constructor() { }
  ngOnDestroy(): void {
    this.mapa.off('zoom', ()=>{});
    this.mapa.off('zoomend', ()=>{});
    this.mapa.off('move', ()=>{});
  }

  ngAfterViewInit(): void {

    console.log('afterViewInit', this.divMapa);

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center:this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
      });

      
      this.mapa.on('zoom',()=>{
        this.zoomLevel = this.mapa.getZoom()
      })
            
      this.mapa.on('zoomend',()=>{
        if(this.mapa.getZoom() > 18){
          this.mapa.zoomTo(18);
        }
        if(this.mapa.getZoom() < 2){
          this.mapa.zoomTo(2);
        }

        // movimiento del mapa

        this.mapa.on('move', (event)=>{
          const target = event.target;

          const { lng, lat } = target.getCenter();

          this.center = [lng, lat];
        })

      })

  }



  zoomOut(){
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomIn(){
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio(valor:string){
    
    this.mapa.zoomTo( Number(valor))
  }

}
