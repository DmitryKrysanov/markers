import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  ViewChild,
} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { filter, Observable } from 'rxjs';
import { DataService, GoogleApiService } from '../../services';
import { AsyncPipe } from '@angular/common';
import { Group } from '../../types';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, AsyncPipe],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  selectedGroup = model<Group>();

  private googleApiService = inject(GoogleApiService);
  private dataService = inject(DataService);

  @ViewChild(GoogleMap) mapRenderer: GoogleMap;

  mapOptions: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    zoomControl: true,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid'],
      position: 7.0,
    },
    styles: [],
    streetViewControl: false,
    fullscreenControl: false,
    center: { lat: 50.100246, lng: 38.613887 },
    zoom: 12,
  };

  readonly data = this.dataService.data;

  readonly isApiLoaded$: Observable<any> =
    this.googleApiService.isApiLoaded$.pipe(filter(Boolean));

  zoomChanged(): void {}

  selectedChanges(selectedGroup: any): void {
    this.selectedGroup.set(selectedGroup);

    this.setOptions({
      center: new google.maps.LatLng(
        selectedGroup.coords.lat,
        selectedGroup.coords.lng
      ),
    });
  }

  private setOptions(options: google.maps.MapOptions): void {
    if (!this.mapRenderer?.googleMap) return;

    this.mapRenderer.googleMap.setOptions(options);
  }
}
