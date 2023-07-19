import { Triangle, Image } from 'fabric';

export const getTriangle = (image: Image) => {
  return new Triangle({
    width: image.width!,
    height: image.height!,
    left: 0,
    top: 0,
    originX: 'center',
    originY: 'center',
  });
};
