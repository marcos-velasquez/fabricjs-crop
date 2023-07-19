import { TPointerEvent, Transform } from 'fabric';

export const actionHandler = (handler: any) => {
  return (event: TPointerEvent, transform: Transform, x: number, y: number) => {
    handler(transform.action, x, y);
    return true;
  };
};
