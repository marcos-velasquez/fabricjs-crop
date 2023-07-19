import { Object, Image } from 'fabric';
import { getTriangle } from './triangle.type';
import { getEllipse } from './ellipse.type';
import { getCircle } from './circle.type';
import { getStar } from './star.type';
import { getHeart } from './heart.type';
import { getHexagono } from './hexagono.type';

export class MaskFactory {
  private types = new Map<string, Object>();

  constructor(image: Image) {
    this.types.set('triangle', getTriangle(image));
    this.types.set('ellipse', getEllipse(image));
    this.types.set('circle', getCircle(image));
    this.types.set('star', getStar(image));
    this.types.set('heart', getHeart(image));
    this.types.set('hexagono', getHexagono(image));
  }

  public getType(type: string): Object | undefined {
    return this.types.get(type) ?? undefined;
  }
}
