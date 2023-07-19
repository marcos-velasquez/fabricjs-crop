import { canvas } from '@fabric-sdk';
import { Control, Object, Point, TMat2D, util } from 'fabric';
import { ControlPositions } from './controls';

export const positionHandler = (handler: any) => {
  return (point: Point, finalMatrix: TMat2D, object: Object, { actionName }: Control) => {
    const xMultiplier = actionName.includes('l') ? -1 : actionName.length > 1 || actionName === 'r' ? 1 : 0;
    const yMultiplier = actionName.includes('t') ? -1 : actionName.length > 1 || actionName === 'b' ? 1 : 0;
    const x = (object.width! / 2) * xMultiplier;
    const y = (object.height! / 2) * yMultiplier;
    handler(ControlPositions.TOP_LEFT, object.left, object.top);
    return util.transformPoint(
      new Point(x, y),
      util.multiplyTransformMatrices(canvas().viewportTransform, object.calcTransformMatrix())
    );
  };
};
