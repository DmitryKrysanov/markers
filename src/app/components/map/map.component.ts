import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  ViewChild,
} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { filter, Observable } from 'rxjs';
import { GroupsService, GoogleApiService } from '../../services';
import { AsyncPipe, NgClass } from '@angular/common';
import { Filter, Group, Marker } from '../../types';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, AsyncPipe, NgClass],
  providers: [MapService],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  selectedGroup = model<Group>();
  filter = input<Filter>();

  private googleApiService = inject(GoogleApiService);
  private groupsService = inject(GroupsService);
  private mapService = inject(MapService);
  parser = new DOMParser();

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
    center: { lat: 49.939182, lng: 39.016807 },
    zoom: 12,
  };

  readonly groups = this.groupsService.groups;
  data = computed(() =>
    this.mapService.getMapData(
      this.groups(),
      this.filter(),
      this.selectedGroup()
    )
  );

  readonly isApiLoaded$: Observable<boolean> =
    this.googleApiService.isApiLoaded$.pipe(filter(Boolean));

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
}
