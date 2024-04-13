import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import mapboxgl, { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'app-zoom-page',
  templateUrl: './zoom-page.component.html',
  styleUrl: './zoom-page.component.css'
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 5;
  public map?: Map;
  public currentLocation: LngLat = new LngLat(-74.10736547526876, 4.62227783331096);

  ngAfterViewInit(): void {
    if (!this.divMap) { throw 'el elemento todavia no se ah creado' }

    this.map = new mapboxgl.Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLocation, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
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

    this.map.on('moveend', () => {
      this.currentLocation = this.map!.getCenter();
    })
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
