import { Object, Image, ImageProps, loadSVGFromURL, util, Canvas, CanvasEvents, Group } from 'fabric';
import { ReplaySubject } from 'rxjs';
import { ObjectPosition } from './utils';

export class FabricService {
  public onCanvasLoad = new ReplaySubject<Canvas>();
  private canvas!: Canvas;

  constructor() {
    window.onload = () => {
      this.onCanvasLoad.next(this.canvas);
    };
  }

  public getCanvas(): Canvas {
    return this.canvas;
  }

  public insert(object: Object): void {
    this.canvas.add(object);
  }

  public remove(objects: Object[]): void {
    this.canvas.remove(...objects);
  }

  public centerObject(object: Object): void {
    new ObjectPosition(this.getWorkspace(), object).centerTargetAtOrigin();
    object.setCoords();
  }

  public cloneObject(object: Object): Promise<Object> {
    return new Promise(async (resolve) => {
      const clone = await object.clone(['name', 'data', 'paintFirst']);
      resolve(clone);
    });
  }

  public fire(eventName: keyof CanvasEvents, data?: { target: Object }) {
    this.canvas.fire(eventName, data);
  }

  public getAll(omit: string[] = []) {
    return this.canvas.getObjects().filter((object) => !omit.includes(object.get('name')));
  }

  public createImageFromURL(url: string, options: Partial<ImageProps> = {}): Promise<Image> {
    return new Promise(async (resolve) => {
      const image = await Image.fromURL(url, { ...options, crossOrigin: 'anonymous' });
      resolve(image);
    });
  }

  public hiddenControlsXYVisibility(object: Object) {
    object.setControlsVisibility({ ml: false, mt: false, mr: false, mb: false });
  }

  public showControlsXYVisibility(object: Object) {
    object.setControlsVisibility({ ml: true, mt: true, mr: true, mb: true });
  }

  public createSvgFromURL(url: string, options: Partial<ImageProps> = {}): Promise<Object | Group> {
    return new Promise(async (resolve) => {
      const setOptions = (_: any, object: Object) => object.set(options);
      const result = await loadSVGFromURL(url, setOptions, { crossOrigin: 'anonymous' });
      const svg = util.groupSVGElements(result.objects);
      svg.set({ name: 'svg' });
      resolve(svg);
    });
  }

  public getWorkspace() {
    return this.canvas.getObjects().find((item) => item.get('name') === 'workspace')! as Object;
  }

  public getObjectFromId(id: string) {
    return this.canvas.getObjects().find((object) => object.get('data').id === id);
  }

  public getObjectFromName(name: string) {
    return this.canvas.getObjects().find((object) => object.get('name') === name);
  }

  public getObjectsFromName(name: string) {
    return this.canvas.getObjects().filter((object) => object.get('name') === name);
  }

  public getObjectsFromType(type: string) {
    return this.canvas.getObjects().filter((object) => object.type === type);
  }

  public setCanvas(canvas: Canvas): void {
    this.canvas = canvas;
  }

  public save() {
    this.canvas.requestRenderAll();
  }
}
