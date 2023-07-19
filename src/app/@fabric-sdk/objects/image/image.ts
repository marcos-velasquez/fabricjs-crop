import { ObjectConstraint, ObjectMapper, canvas, insert, remove } from '@fabric-sdk';
import { Object, Image as FabricImage, ImageProps, ImageSource, TPointerEventInfo, TPointerEvent } from 'fabric';
import { cloneImage } from './services/cloneImage.service';
import { ControlService } from './controls/control.service';
import { positionHandler } from './controls/position.handler';
import { actionHandler } from './controls/action.handler';
import { ControlPositions } from './controls/controls';
import { MaskFactory } from './types/types.factory';
import { CropperService } from './services/cropper.service';

export class Image extends FabricImage {
  private isCropMode = false;
  private referenceImage: FabricImage | null = null;
  private __mask = 'rectangule';
  private lastCrop: Partial<FabricImage> | null = null;
  private objectConstraintService: ObjectConstraint | null = null;
  constructor(source: ImageSource, options: Partial<ImageProps> = {}) {
    super(source, options);
    this.registerEvents();
  }

  private registerEvents() {
    this.on('mousedblclick', () => this.activateCropMode());
  }

  public async activateCropMode() {
    if (!this.isCropMode && !this.get('data').noCropable) {
      this.isCropMode = true;
      this.lastCrop = new ObjectMapper(this).getMainMeasures();
      await this.setupReferenceImage();
      this.setupOriginalImage();
    }
  }

  public deactivateCropMode() {
    this.isCropMode = false;
    this.destroyCropMode();
  }

  public applyCrop() {
    this.destroyCropMode();
  }

  public cancelCrop() {
    this.deactivateCropMode();
    this.set({ ...this.lastCrop });
    canvas().requestRenderAll();
  }

  public changeMask(type: string) {
    this.__mask = type;
    this.applyMask();
    canvas().requestRenderAll();
  }

  private applyMask() {
    if (this.clipPath instanceof Object) {
      this.clipPath = undefined;
    }
    this.clipPath = new MaskFactory(this).getType(this.__mask);
    canvas().requestRenderAll();
  }

  private async setupReferenceImage() {
    this.referenceImage = await new cloneImage(this).getClone();
    insert(this.referenceImage);
    canvas().requestRenderAll();
    canvas().sendObjectBackwards(this.referenceImage);
    this.registerReferenceImageEvents();
  }

  private registerReferenceImageEvents() {
    this.objectConstraintService = new ObjectConstraint(this.referenceImage!, this);
    this.referenceImage!.on('moving', (event: TPointerEventInfo<TPointerEvent>) => {
      this.objectConstraintService!.restrictMovingExternalElement();
      this.movingHandler(event);
    });

    this.referenceImage!.on('scaling', () => {
      this.set({ scaleX: this.referenceImage?.scaleX, scaleY: this.referenceImage?.scaleY });
      this.crop(ControlPositions.TOP_LEFT, this.left, this.top);
    });
  }

  private setupOriginalImage() {
    this.get('data').isCropping = true;
    this.get('data').noRemoveable = true;
    this.set({ lockMovementX: true, lockMovementY: true });
    this.on('moving', this.movingHandler);
    this.applyMask();
    const controlActionHandler = actionHandler(this.controlActionHandler);
    const controlPositionHandler = positionHandler(this.controlPositionHandler);
    new ControlService(this).changeControls(controlActionHandler, controlPositionHandler);
  }

  private controlActionHandler = (controlPosition: string, left: number, top: number) => {
    this.crop(controlPosition, left, top, true);
  };

  private controlPositionHandler = (controlPosition: string, left: number, top: number) => {
    if (this.isCropMode) {
      this.set('dirty', true);
      this.crop(controlPosition, left, top);
    }
  };

  private movingHandler = (event: TPointerEventInfo<TPointerEvent>) => {
    if (this.isCropMode && event.pointer) {
      this.set('dirty', true);
      this.crop(ControlPositions.TOP_LEFT, this.left, this.top);
    }
  };

  private crop(position: string, left: number, top: number, resize = false) {
    new CropperService(this.referenceImage!, this).crop(position, left, top, resize);
    this.applyMask();
  }

  private destroyCropMode() {
    this.isCropMode = false;
    remove([this.referenceImage!]);
    this.get('data').isCropping = false;
    this.get('data').noRemoveable = false;
    this.off('moving', this.movingHandler);
    this.set({ lockMovementX: false, lockMovementY: false });
    this.objectConstraintService!.destroy();
    canvas().requestRenderAll();
  }
}
