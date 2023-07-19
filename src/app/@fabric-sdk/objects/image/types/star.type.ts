import { Polygon, Image } from 'fabric';

export const getStar = (image: Image) => {
  const starPoints = [
    { x: 349.9, y: 75 },
    { x: 379, y: 160.9 },
    { x: 469, y: 160.9 },
    { x: 397, y: 214.9 },
    { x: 423, y: 300.9 },
    { x: 350, y: 249.9 },
    { x: 276.9, y: 301 },
    { x: 303, y: 215 },
    { x: 231, y: 161 },
    { x: 321, y: 161 },
  ];

  const star = new Polygon(starPoints, {
    left: 0,
    top: 0,
    originX: 'center',
    originY: 'center',
  });

  if (image.height! > image.width!) {
    star.scaleToWidth(image.width!);
  } else {
    star.scaleToHeight(image.height!);
  }

  return star;
};
