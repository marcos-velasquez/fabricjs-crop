import { Image } from 'fabric';

export class CropperService {
  constructor(private referenceImage: Image, private originalImage: Image) {}

  public crop(position: string, x: number, y: number, resize = false) {
    const { top = 0, left = 0, width = 0, height = 0, scaleX = 1, scaleY = 1 } = this.referenceImage;
    if (position.includes('t')) {
      const maxTop = top + height * scaleY - (resize ? 0 : this.originalImage.getScaledHeight());
      const minTop = Math.min(y, maxTop, this.originalImage.top + this.originalImage.getScaledHeight());
      this.originalImage.top = Math.max(minTop, top);
      const cropY = Math.min((Math.min(Math.max(y, top), this.originalImage.top) - top) / scaleY, height);
      if (resize) {
        this.originalImage.height = Math.max(
          0,
          Math.min(this.originalImage.height + (this.originalImage.cropY - cropY), height)
        );
      }
      this.originalImage.cropY = cropY;
    } else if (position.includes('b') && resize) {
      const minHeight = Math.min((y - top) / scaleY - this.originalImage.cropY, height - this.originalImage.cropY);
      this.originalImage.height = Math.max(0, minHeight);
    }
    if (position.includes('l')) {
      const maxLeft = left + width * scaleX - (resize ? 0 : this.originalImage.getScaledWidth());
      const minLeft = Math.min(x, maxLeft, this.originalImage.left + this.originalImage.getScaledWidth());
      this.originalImage.left = Math.max(minLeft, left);
      const cropX = Math.min((Math.min(Math.max(x, left), this.originalImage.left) - left) / scaleX, width);
      if (resize) {
        this.originalImage.width = Math.max(
          0,
          Math.min(this.originalImage.width + (this.originalImage.cropX - cropX), width)
        );
      }
      this.originalImage.cropX = cropX;
    } else if (position.includes('r') && resize) {
      const minWidth = Math.min((x - left) / scaleX - this.originalImage.cropX, width - this.originalImage.cropX);
      this.originalImage.width = Math.max(0, minWidth);
    }
  }
}
