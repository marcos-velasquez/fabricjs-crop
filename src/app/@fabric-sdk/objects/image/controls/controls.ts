import { Control, util, Object as FabricObject, ControlActionHandler, Point, TMat2D } from 'fabric';

const drawTopRightIcon = (
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  _: any,
  fabricObject: FabricObject
) => {
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(util.degreesToRadians(fabricObject.angle));
  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.lineWidth = 5;
  ctx.shadowBlur = 2;
  ctx.shadowColor = 'black';
  ctx.moveTo(0, 0);
  ctx.lineTo(0.5, 12);
  ctx.moveTo(0, 0);
  ctx.lineTo(-12, 0);
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.restore();
};

const drawTopLeftIcon = (
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  _: any,
  fabricObject: FabricObject
) => {
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(util.degreesToRadians(fabricObject.angle));
  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.lineWidth = 5;
  ctx.shadowBlur = 2;
  ctx.shadowColor = 'black';
  ctx.moveTo(0, 0);
  ctx.lineTo(0.5, 12);
  ctx.moveTo(0, 0);
  ctx.lineTo(12, 0);
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.restore();
};

const drawBottomLeftIcon = (
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  _: any,
  fabricObject: FabricObject
) => {
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(util.degreesToRadians(fabricObject.angle));
  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.lineWidth = 5;
  ctx.shadowBlur = 2;
  ctx.shadowColor = 'black';
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -12);
  ctx.moveTo(0, 0);
  ctx.lineTo(12, 0);
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.restore();
};

const drawBottomRightIcon = (
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  _: any,
  fabricObject: FabricObject
) => {
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(util.degreesToRadians(fabricObject.angle));
  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.lineWidth = 5;
  ctx.shadowBlur = 2;
  ctx.shadowColor = 'black';
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -12);
  ctx.moveTo(0, 0);
  ctx.lineTo(-12, 0);
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.restore();
};

const drawVerticalLineIcon = (
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  _: any,
  fabricObject: FabricObject
) => {
  const size = 24;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(util.degreesToRadians(fabricObject.angle));
  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.lineWidth = 5;
  ctx.shadowBlur = 2;
  ctx.shadowColor = 'black';
  ctx.moveTo(-0.5, -size / 4);
  ctx.lineTo(-0.5, -size / 4 + size / 2);
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.restore();
};

const drawHorizontalLineIcon = (
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  _: any,
  fabricObject: FabricObject
) => {
  const size = 24;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(util.degreesToRadians(fabricObject.angle));
  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.lineWidth = 5;
  ctx.shadowBlur = 2;
  ctx.shadowColor = 'black';
  ctx.moveTo(-size / 4, -0.5);
  ctx.lineTo(-size / 4 + size / 2, -0.5);
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.restore();
};

export const controlPositionIcons = {
  tl: drawTopLeftIcon,
  t: drawHorizontalLineIcon,
  tr: drawTopRightIcon,
  r: drawVerticalLineIcon,
  br: drawBottomRightIcon,
  b: drawHorizontalLineIcon,
  bl: drawBottomLeftIcon,
  l: drawVerticalLineIcon,
};

export enum ControlPositions {
  TOP_LEFT = 'tl',
  TOP = 't',
  TOP_RIGHT = 'tr',
  RIGHT = 'r',
  BOTTOM_RIGHT = 'br',
  BOTTOM = 'b',
  BOTTOM_LEFT = 'bl',
  LEFT = 'l',
}

export type PositionHandler = (dim: Point, finalMatrix: TMat2D, object: FabricObject, control: Control) => Point;
export const createControls = (actionHandler: ControlActionHandler, positionHandler: PositionHandler) => {
  return Object.values(ControlPositions).reduce((acc: Partial<Record<ControlPositions, Control>>, position) => {
    acc[position] = new Control({
      cursorStyle: position + '-resize',
      actionName: position,
      render: controlPositionIcons[position],
      actionHandler: actionHandler,
      positionHandler: positionHandler,
    });
    return acc;
  }, {});
};
