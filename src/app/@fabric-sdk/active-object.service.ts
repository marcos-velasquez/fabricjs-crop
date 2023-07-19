import { ReplaySubject } from 'rxjs';
import { Object, ActiveSelection, Group } from 'fabric';
import { fabricServiceInstance } from '@fabric-sdk';

export class ActiveObjectService {
  private fabricService = fabricServiceInstance;
  private activeObjectSubject = new ReplaySubject<Object>(1);
  private deactivateObject = new ReplaySubject<void>(1);

  constructor() {
    this.fabricService.onCanvasLoad.subscribe((canvas) => {
      canvas.on('selection:created', this.emitActiveObject);
      canvas.on('selection:updated', this.emitActiveObject);
      canvas.on('selection:cleared', this.emitDeactivateObject);
    });
  }

  public activeObjectChange() {
    return this.activeObjectSubject.asObservable();
  }

  public deactivateObjectChange() {
    return this.deactivateObject.asObservable();
  }

  private emitActiveObject = () => {
    this.activeObjectSubject.next(this.getActiveObject()!);
  };

  private emitDeactivateObject = () => {
    this.deactivateObject.next();
  };

  public setActiveObject(object: Object) {
    this.fabricService.getCanvas().setActiveObject(object);
  }

  public getActiveObject() {
    return this.fabricService.getCanvas().getActiveObject()!;
  }

  public hasActiveObject() {
    return Boolean(this.getActiveObject());
  }

  public getActiveObjects() {
    return this.fabricService.getCanvas().getActiveObjects();
  }

  public hasActiveObjects() {
    return this.getActiveObjects().length > 0;
  }

  public hasActiveObjectsNotInclude(names: string[]) {
    const objects = this.getActiveObjects().filter((object) => names.includes(object.get('name')));
    return Boolean(!objects.length);
  }

  public getActiveObjectAsSelection() {
    return this.getActiveObject() as unknown as ActiveSelection;
  }

  public getActiveObjectsWithoutName(names: string[]) {
    return this.getActiveObjects().filter((object) => !names.includes(object.get('name')));
  }

  public isActiveObjectGroup() {
    return this.getActiveObject().type === 'group' || this.getActiveObject() instanceof Group;
  }

  public isActiveObjectText() {
    return ['i-text', 'textbox', 'Curvedtext', 'text'].includes(this.getActiveObject().type!);
  }

  public isActiveObjectImage() {
    return this.hasActiveObject() && this.getActiveObject().type === 'image';
  }

  public isActiveObjectSvg() {
    return this.hasActiveObject() && this.getActiveObject().get('name') === 'svg';
  }

  public isActiveObjectShape() {
    return this.hasActiveObject() && this.getActiveObject().get('name') === 'shape';
  }

  public isActiveObjectSelection() {
    return this.hasActiveObject() && this.getActiveObject().type === 'activeselection';
  }

  public deactivateActiveObject() {
    this.fabricService.getCanvas().discardActiveObject();
  }

  public isActiveObjectRect(): boolean {
    return this.isActiveObjectShape() && this.getActiveObject().type === 'rect';
  }

  public isActiveObjectTag(): boolean {
    return this.hasActiveObject() && ['shopping', 'tag'].includes(this.getActiveObject().type!);
  }

  public isActiveObjectBackgroundImage() {
    return this.hasActiveObject() && this.getActiveObject().get('name') === 'backgroundImage';
  }

  public isActiveObjectRemoveable() {
    return this.hasActiveObjects() && !this.getActiveObject().get('data')?.noRemoveable;
  }

  public isActiveObjectsGroupable() {
    return (
      this.hasActiveObject() &&
      this.getActiveObjectAsSelection()._objects.every((object) => !object.get('data').noGroupable)
    );
  }
}
