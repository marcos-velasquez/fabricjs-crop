import { Path, Image } from 'fabric';

export const getHeart = (image: Image) => {
  const heartPathData = `
  M 272.70141,238.71731 \
  C 206.46141,238.71731 152.70146,292.4773 152.70146,358.71731  \
  C 152.70146,493.47282 288.63461,528.80461 381.26391,662.02535 \
  C 468.83815,529.62199 609.82641,489.17075 609.82641,358.71731 \
  C 609.82641,292.47731 556.06651,238.7173 489.82641,238.71731  \
  C 441.77851,238.71731 400.42481,267.08774 381.26391,307.90481 \
  C 362.10311,267.08773 320.74941,238.7173 272.70141,238.71731  \
  z 
  `;

  const path = new Path(heartPathData, {
    left: 0,
    top: 0,
    originX: 'center',
    originY: 'center',
  });
  if (image.height! > image.width!) {
    path.scaleToWidth(image.width!);
  } else {
    path.scaleToHeight(image.height!);
  }
  return path;
};
