import { cloneObject, hiddenControlsXYVisibility } from '@fabric-sdk';
import { Image } from 'fabric';

export class cloneImage {
  constructor(private image: Image) {}

  public async getClone(): Promise<Image> {
    const clone = (await cloneObject(this.image)) as Image;
    const element = clone.getElement();
    const { top = 0, left = 0, cropX = 0, cropY = 0, scaleX = 1, scaleY = 1 } = clone;
    clone.set({
      top: top - cropY * scaleY,
      left: left - cropX * scaleX,
      height: element.height,
      width: element.width,
      cropX: 0,
      cropY: 0,
      opacity: 0.5,
      excludeFromExport: true,
      name: 'activeCropImage',
      clipPath: undefined,
      data: { noCropable: true },
      lockRotation: true,
    });
    hiddenControlsXYVisibility(clone);
    return clone;
  }
}
