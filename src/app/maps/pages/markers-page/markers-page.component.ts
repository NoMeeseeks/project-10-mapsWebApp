import { Component, ElementRef, ViewChild } from '@angular/core';
import mapboxgl, { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker: Marker;
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 5;
  public map?: Map;
  public currentLocation: LngLat = new LngLat(-74.10736547526876, 4.62227783331096);
  public currentMarkers: MarkerColor[] = [];

  ngAfterViewInit(): void {
    if (!this.divMap) { throw 'el elemento todavia no se ah creado' }

    this.map = new mapboxgl.Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLocation, // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    //   const marcadorHtml = document.createElement('div');
    //   marcadorHtml.innerHTML = 'd'

    //   const marcador = new Marker(
    //     {
    //       color: 'red',
    //       element: marcadorHtml
    //     }
    //   )
    //     .setLngLat(this.currentLocation)
    //     .addTo(this.map);
  }

  crearMarcador() {
    if (!this.map) { return }
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lnglat = this.map.getCenter();
    this.masMarcadores(lnglat, color);
  }

  masMarcadores(lnglat: LngLat, color: string | 'red') {
    if (!this.map) { return }
    const marcador = new Marker(
      {
        color: color,
        draggable: true
      }
    )
      .setLngLat(lnglat)
      .addTo(this.map);
    this.currentMarkers.push({ marker: marcador, color: color });
  }

  eliminarMarcador(index: number) {
    this.currentMarkers[index].marker.remove();
    this.currentMarkers.splice(index, 1)
  }

  flytoo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    })
  }
}
