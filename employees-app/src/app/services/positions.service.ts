import { Injectable } from '@angular/core';

@Injectable()
export class PositionsService {
  positions: string[] = [
    'Full Stack Developer',
    'Android Developer',
    'iOS Developer',
  ];
  constructor() {}

  getPositions(): string[] {
    return this.positions;
  }
}
