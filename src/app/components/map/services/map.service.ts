import { Injectable } from '@angular/core';
import { format, isAfter, isBefore, isSameDay } from 'date-fns';
import { Filter, Group, Marker } from '../../../types';
import { chain, cloneDeep } from 'lodash';

type MapData = {
  date: Date;
  groups: Marker[];
};

@Injectable()
export class MapService {
  getMapData(
    groups: Group[],
    filter: Filter,
    selectedGroup: Group,
    isShowLabel: boolean
  ): MapData[] {
    if (!groups) return null;

    const flattened = this.flattenGroups(groups);
    const groupedByDate = this.groupByDate(
      flattened,
      selectedGroup,
      isShowLabel
    );
    const filteredByDate = this.filterByDate(groupedByDate, filter.range);

    return cloneDeep(filteredByDate);
  }

  createSvgElement(date: Date, marker: Marker): SVGSVGElement {
    const svgElement = this.createSvgContainer();

    const circle = this.createCircle(marker.isSelected, this.isPastDate(date));
    svgElement.appendChild(circle);

    if (!marker.isShowLabel) return svgElement;

    const label = this.createLabel(marker.name, this.isPastDate(date));
    svgElement.appendChild(label);

    if (this.isPastDate(date)) {
      const dateLabel = this.createDateLabel(
        date.toDateString(),
        this.isPastDate(date)
      );
      svgElement.appendChild(dateLabel);
    }

    return svgElement;
  }

  private flattenGroups(groups: Group[]): {
    date: Date;
    name: string;
    coords: google.maps.LatLngLiteral;
    id: number;
  }[] {
    return groups.flatMap((group) =>
      group.location.map((location) => ({
        date: location.date,
        name: group.name,
        coords: location.coords,
        id: group.id,
      }))
    );
  }

  private groupByDate(
    flattened: {
      date: Date;
      name: string;
      coords: google.maps.LatLngLiteral;
      id: number;
    }[],
    selectedGroup: Group,
    isShowLabel: boolean
  ): {
    date: Date;
    groups: {
      id: number;
      name: string;
      coords: google.maps.LatLngLiteral;
      isSelected: boolean;
      isShowLabel: boolean;
    }[];
  }[] {
    return chain(flattened)
      .groupBy((item) => +item.date)
      .map((items) => ({
        date: items[0].date,
        groups: items.map((item) => ({
          id: item.id,
          name: item.name,
          coords: item.coords,
          isSelected: item.id === selectedGroup?.id,
          isShowLabel,
        })),
      }))
      .value();
  }

  private filterByDate(
    groups: MapData[],
    { start, end }: { start: Date; end: Date }
  ): MapData[] {
    if (!start || !end) return [];

    return groups.filter(
      (group) =>
        (isSameDay(group.date, start) || isAfter(group.date, start)) &&
        (isSameDay(group.date, end) || isBefore(group.date, end))
    );
  }

  private createSvgContainer(): SVGSVGElement {
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const svgElement = document.createElementNS(svgNamespace, 'svg');
    svgElement.setAttribute('xmlns', svgNamespace);
    svgElement.setAttribute('width', '80');
    svgElement.setAttribute('height', '80');
    svgElement.setAttribute('viewBox', '0 0 80 80');
    return svgElement;
  }

  private createCircle(
    isSelected: boolean,
    isPastDate: boolean
  ): SVGCircleElement {
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const circle = document.createElementNS(svgNamespace, 'circle');
    circle.setAttribute('cx', '40');
    circle.setAttribute('cy', '40');
    circle.setAttribute('r', '10');
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('stroke-width', '4');
    circle.setAttribute('fill', isSelected ? '#416835' : 'white');

    if (isPastDate) {
      circle.setAttribute('opacity', '0.2');
    }

    return circle;
  }

  private createLabel(text: string, isPastDate: boolean): SVGTextElement {
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const label = document.createElementNS(svgNamespace, 'text');
    label.setAttribute('x', '40');
    label.setAttribute('y', '70');
    label.setAttribute('fill', 'black');
    label.setAttribute('font-size', '14');
    label.setAttribute('font-weight', 'bold');
    label.setAttribute('text-anchor', 'middle');
    label.textContent = text;

    if (isPastDate) {
      label.setAttribute('opacity', '0.5');
    }

    return label;
  }

  private createDateLabel(text: string, isPastDate: boolean): SVGTextElement {
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const label = document.createElementNS(svgNamespace, 'text');
    label.setAttribute('x', '40');
    label.setAttribute('y', '20');
    label.setAttribute('fill', 'black');
    label.setAttribute('font-size', '12');
    label.setAttribute('font-weight', 'regular');
    label.setAttribute('text-anchor', 'middle');

    if (isPastDate) {
      label.setAttribute('opacity', '0.5');
    }

    const formattedDate = format(new Date(), 'dd.MM.yyyy');
    label.textContent = `(${formattedDate})`;

    return label;
  }

  private isPastDate(date: Date): boolean {
    return !isSameDay(date, new Date());
  }
}
