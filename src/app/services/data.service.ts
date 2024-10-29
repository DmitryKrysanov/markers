import { Injectable, signal } from '@angular/core';
import { dataMock } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data = signal(dataMock);
}
