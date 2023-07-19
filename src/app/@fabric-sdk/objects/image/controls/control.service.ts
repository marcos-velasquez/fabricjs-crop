import { Image, ControlActionHandler } from 'fabric';
import { PositionHandler, createControls } from './controls';

export class ControlService {
  constructor(private image: Image) {}

  public changeControls(actionHandler: ControlActionHandler, positionHandler: PositionHandler) {
    this.image.controls = createControls(actionHandler, positionHandler);
  }
}
