import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  signal,
  ViewChild,
} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { filter, Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { GoogleApiService, GroupsService } from '../../../services';
import { Group, Filter, Marker } from '../../../types';
import { MapService } from '../services/map.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, AsyncPipe, NgClass, MatButtonModule],
  providers: [MapService],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  selectedGroup = model<Group>();
  filter = input<Filter>();
  private isShowLabel = signal<boolean>(true);

  private googleApiService = inject(GoogleApiService);
  private groupsService = inject(GroupsService);
  private mapService = inject(MapService);
  parser = new DOMParser();

  @ViewChild(GoogleMap) mapRenderer: GoogleMap;

  private initialCenter = { lat: 49.939182, lng: 39.016807 };
  private initialZoom: number;

  mapOptions: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    zoomControl: true,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid'],
      position: 6.0,
    },
    styles: [],
    streetViewControl: false,
    fullscreenControl: false,
    center: this.initialCenter,
    zoom: 12,
  };

  readonly isApiLoaded$: Observable<boolean> =
    this.googleApiService.isApiLoaded$.pipe(filter(Boolean));

  readonly groups = this.groupsService.groups;
  data = computed(() =>
    this.mapService.getMapData(
      this.groups(),
      this.filter(),
      this.selectedGroup(),
      this.isShowLabel()
    )
  );

  reset(): void {
    const options: google.maps.MapOptions = {
      center: this.initialCenter,
      zoom: this.initialZoom,
    };

    this.setOptions(options);
  }

  zoomChanged(): void {
    const currentZoom = this.mapRenderer.googleMap.getZoom();

    if (!this.initialZoom) this.initialZoom = currentZoom;

    const isShowLabel =
      currentZoom === this.initialZoom * 2 || currentZoom > 10;
    this.isShowLabel.set(isShowLabel);
  }

  selectedChanges(selectedMarker: Marker): void {
    const selectedGroup = this.groups().find(
      (group: Group) => group.id === selectedMarker.id
    );

    this.selectedGroup.set(selectedGroup);
  }

  getMarkerOptions(
    date: Date,
    marker: Marker
  ): google.maps.marker.AdvancedMarkerElementOptions {
    const svgElement = this.mapService.createSvgElement(date, marker);

    return {
      content: svgElement,
    };
  }

  private setOptions(options: google.maps.MapOptions): void {
    if (!this.mapRenderer?.googleMap) return;

    this.mapRenderer.googleMap.setOptions(options);
  }
}
