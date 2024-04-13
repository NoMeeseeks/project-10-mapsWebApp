import { Component, ElementRef, ViewChild } from '@angular/core';
import mapboxgl, { Map } from 'mapbox-gl';

@Component({
  selector: 'app-zoom-page',
  templateUrl: './zoom-page.component.html',
  styleUrl: './zoom-page.component.css'
})
export class ZoomPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap) { throw 'el elemento todavia no se ah creado' }

    this.map = new mapboxgl.Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListener();
  }

  mapListener() {
    if (!this.map) { throw 'mapa no inicializado' }

    this.map.on('zoom', (evento) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (evento) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }
  zoomOut() {
    this.map?.zoomOut();
  }
  zoomChanged(value: string) {
    this.zoom = Number(value)
    this.map!.zoomTo(this.zoom)
  }
}
