// <reference path="../../../node_modules/@types/google__maps/index.d.ts" />



import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-mapa-nativo',
  templateUrl: './mapa-nativo.component.html',
  styleUrls: ['./mapa-nativo.component.css']
})
export class MapaNativoComponent implements OnInit {

  @ViewChild('divMap')  divMap!: ElementRef;
  mapa!: google.maps.Map;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
        this.cargarMapa(position);
      })
    }else{
      console.log('navegador no compatible');
    }
  
  }



  cargarMapa(position: GeolocationPosition){
    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }
    this.mapa = new google.maps.Map(this.divMap.nativeElement, opciones);
    const icon = {
      url : 'data:image/png;base64,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',
      scaledSize: new google.maps.Size(100,100)
      
    }
    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      animation: google.maps.Animation.DROP,
      icon: icon
    });
    markerPosition.setMap(this.mapa);
    google.maps.event.addListener(this.mapa, 'click',(event:google.maps.MapMouseEvent)=>{
      const marker = new google.maps.Marker({
        position: event.latLng,
        animation: google.maps.Animation.DROP
      });
      marker.setDraggable(true);
      marker.setMap(this.mapa);
    });
  }

}
