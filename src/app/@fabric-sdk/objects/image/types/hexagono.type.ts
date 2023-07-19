import { Polygon, Image } from 'fabric';

export const getHexagono = (image: Image) => {
  const hexagonoPoints = [
    { x: 300, y: 0 },
    { x: 100, y: 0 },
    { x: 0, y: 173.21 },
    { x: 100, y: 346.41 },
    { x: 300, y: 346.41 },
    { x: 400, y: 173.21 },
  ];

  const hexagono = new Polygon(hexagonoPoints, {
    left: 0,
    top: 0,
    originX: 'center',
    originY: 'center',
  });

  if (image.height! > image.width!) {
    hexagono.scaleToWidth(image.width!);
  } else {
    hexagono.scaleToHeight(image.height!);
  }

  return hexagono;
};
