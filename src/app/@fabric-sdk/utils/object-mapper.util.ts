import { Object } from 'fabric';

export class ObjectMapper {
  constructor(private object: Object) {}

  public getMainMeasures() {
    return {
      left: this.object.left,
      top: this.object.top,
      width: this.object.width,
      height: this.object.height,
      scaleX: this.object.scaleX,
      scaleY: this.object.scaleY,
    };
  }
}
