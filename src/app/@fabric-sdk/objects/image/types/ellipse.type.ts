import { Ellipse, Image } from 'fabric';

export const getEllipse = (image: Image) => {
  return new Ellipse({
    rx: image.width! / 2,
    ry: image.height! / 2,
    left: 0,
    top: 0,
    originX: 'center',
    originY: 'center',
  });
};
