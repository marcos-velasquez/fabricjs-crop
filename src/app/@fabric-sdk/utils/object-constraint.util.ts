import { Object } from 'fabric';
import { ObjectPosition } from './object-position.util';
import { ObjectMapper } from './object-mapper.util';

export class ObjectConstraint {
  private externalLastState: Partial<Object>;
  private internalLastState: Partial<Object>;

  constructor(private externalElement: Object, private internalElement: Object) {
    this.externalLastState = new ObjectMapper(this.externalElement).getMainMeasures();
    this.internalLastState = new ObjectMapper(this.internalElement).getMainMeasures();
  }

  public restric(): void {
    this.externalElement.on('scaling', this.retricExternalScaling);
    this.externalElement.on('moving', this.restricExternalMoving);
    this.internalElement.on('scaling', this.retrictInternalScaling);
    this.internalElement.on('moving', this.restricInternalMoving);
  }

  public restrictMovingExternalElement() {
    this.restricExternalMoving();
  }

  public destroy(): void {
    this.externalElement.off('scaling', this.retricExternalScaling);
    this.externalElement.off('moving', this.restricExternalMoving);
    this.internalElement.off('scaling', this.retrictInternalScaling);
    this.internalElement.off('moving', this.restricInternalMoving);
  }

  private retricExternalScaling = (): void => {
    const target = this.externalElement;
    const positionService = new ObjectPosition(this.internalElement, target);

    if (positionService.isTargetOutsideBoundsFromOrigin()) {
      target.set({ ...this.externalLastState });
    }

    if (positionService.isTargetLeftGreaterThanOriginLeft()) {
      positionService.moveLeftTargetAtOrigin();
    }

    if (positionService.isTargetTopGreaterThanOriginTop()) {
      positionService.moveTopTargetAtOrigin();
    }

    this.externalLastState = new ObjectMapper(this.externalElement).getMainMeasures();
  };

  private restricExternalMoving = (): void => {
    const target = this.externalElement;
    const positionService = new ObjectPosition(this.internalElement, target);

    if (positionService.isTargetLeftGreaterThanOriginLeft()) {
      positionService.moveLeftTargetAtOrigin();
    }

    if (positionService.isTargetTopGreaterThanOriginTop()) {
      positionService.moveTopTargetAtOrigin();
    }

    if (positionService.isTargetRightLessThanOriginRight()) {
      positionService.moveRightTargetAtOrigin();
    }

    if (positionService.isTargetBottomLessThanOriginBottom()) {
      positionService.moveBottomTargetAtOrigin();
    }
  };

  private retrictInternalScaling = (): void => {
    const target = this.internalElement;
    const positionService = new ObjectPosition(this.externalElement, target);

    if (positionService.isTargetBeyondOriginBounds()) {
      target.set({ ...this.internalLastState });
    }

    if (positionService.isTargetLeftLessThanOriginLeft()) {
      positionService.moveLeftTargetAtOrigin();
    }

    if (positionService.isTargetTopLessThanOriginTop()) {
      positionService.moveTopTargetAtOrigin();
    }

    this.internalLastState = new ObjectMapper(this.internalElement).getMainMeasures();
  };

  private restricInternalMoving = (): void => {
    const target = this.internalElement;
    const positionService = new ObjectPosition(this.externalElement, target);

    if (positionService.isTargetLeftLessThanOriginLeft()) {
      positionService.moveLeftTargetAtOrigin();
    }
    if (positionService.isTargetTopLessThanOriginTop()) {
      positionService.moveTopTargetAtOrigin();
    }

    if (positionService.isTargetRightGreaterThanOriginRight()) {
      positionService.moveRightTargetAtOrigin();
    }

    if (positionService.isTargetTopGreaterThanOriginTop()) {
      positionService.moveBottomTargetAtOrigin();
    }
  };
}
