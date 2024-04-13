import { Component, ElementRef, ViewChild } from '@angular/core';
import mapboxgl, { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker: Marker;
}
interface smallMarker {
  color: string;
  lnglat: number[];

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

    this.leerDelLocalStorage();
  }

  crearMarcador() {
    if (!this.map) { return }
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lnglat = this.map.getCenter();
    this.guardarMarcador(lnglat, color);
  }

  guardarMarcador(lnglat: LngLat, color: string | 'red') {
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
    this.guardarEnLocalStorage();

    marcador.on('dragend', () => {
      this.guardarEnLocalStorage();
    })
  }

  eliminarMarcador(index: number) {
    this.currentMarkers[index].marker.remove();
    this.currentMarkers.splice(index, 1)
    this.guardarEnLocalStorage();
  }

  flytoo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    })
  }

  guardarEnLocalStorage() {
    const smallmarker: smallMarker[] = this.currentMarkers.map((colorMarker) => {
      return {
        color: colorMarker.color,
        lnglat: colorMarker.marker.getLngLat().toArray()
      }
    })
    localStorage.setItem('smallMarkers', JSON.stringify(smallmarker))
  }

  leerDelLocalStorage() {
    const string = localStorage.getItem('smallMarkers') ?? '[]';
    const smallmarkers: smallMarker[] = JSON.parse(string);

    smallmarkers.forEach(({ color, lnglat }) => {
      const [lng, lat] = lnglat;
      const coordenadas = new LngLat(lng, lat);

      this.guardarMarcador(coordenadas, color);
    })
  }
}
