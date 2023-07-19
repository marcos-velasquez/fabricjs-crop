import { Circle, Image } from 'fabric';

export const getCircle = (image: Image) => {
  const radius = Math.min(image.width!, image.height!) / 2;

  return new Circle({
    radius,
    left: 0,
    top: 0,
    originX: 'center',
    originY: 'center',
  });
};
