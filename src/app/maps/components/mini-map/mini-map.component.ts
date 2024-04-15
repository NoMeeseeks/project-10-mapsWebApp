import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import mapboxgl, { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {
  @Input()
  lngLat?: [number, number]

  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (!this.divMap) { throw 'El mapa no se encontro' };
    if (!this.lngLat) { throw 'La latitud y longitud no pueden ser nulas' };

    const map = new mapboxgl.Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 14, // starting zoom
      interactive: false
    });

    new Marker().setLngLat(this.lngLat).addTo(map);
  }
}
