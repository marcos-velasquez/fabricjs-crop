import { Object } from 'fabric';

export class ObjectPosition {
  constructor(private origin: Object, private target: Object) {}

  public moveRightTargetAtOrigin(): void {
    this.target.set({ left: this.getAdjustedTargetLeftPositionFromOrigin() });
  }

  public moveLeftTargetAtOrigin(): void {
    this.target.set({ left: this.origin.left });
  }

  public moveTopTargetAtOrigin(): void {
    this.target.set({ top: this.origin.top });
  }

  public moveBottomTargetAtOrigin(): void {
    this.target.set({ top: this.getAdjustedTargetTopPositionFromOrigin() });
  }

  public centerHorizontallyTargetAtOrigin(): void {
    this.target.set({
      left: this.origin.getCenterPoint().x - this.target.getScaledWidth() / 2,
    });
  }

  public centerTargetAtOrigin(): void {
    this.centerHorizontallyTargetAtOrigin();
    this.centerVerticallyTargetAtOrigin();
  }

  public centerVerticallyTargetAtOrigin(): void {
    this.target.set({
      top: this.origin.getCenterPoint().y - this.target.getScaledHeight() / 2,
    });
  }

  public getTargetRight(): number {
    return this.target.left! + this.target.getScaledWidth();
  }

  public getOriginRight(): number {
    return this.origin.left! + this.origin.getScaledWidth();
  }

  public getTargetBottom(): number {
    return this.target.top! + this.target.getScaledHeight();
  }

  public getOriginBottom(): number {
    return this.origin.top! + this.origin.getScaledHeight();
  }

  public isTargetLeftGreaterThanOriginLeft(): boolean {
    return this.target.left > this.origin.left;
  }

  public isTargetTopGreaterThanOriginTop(): boolean {
    return this.target.top > this.origin.top;
  }

  public isTargetLeftLessThanOriginLeft(): boolean {
    return this.target.left < this.origin.left;
  }

  public isTargetTopLessThanOriginTop(): boolean {
    return this.target.top < this.origin.top;
  }

  public isTargetRightLessThanOriginRight(): boolean {
    return this.getTargetRight() < this.getOriginRight();
  }

  public isTargetBottomLessThanOriginBottom(): boolean {
    return this.getTargetBottom() < this.getOriginBottom();
  }

  public isTargetRightGreaterThanOriginRight(): boolean {
    return this.getTargetRight() > this.getOriginRight();
  }

  public isTargetBottomGreaterThanOriginBottom(): boolean {
    return this.getTargetBottom() > this.getOriginBottom();
  }

  public isTargetOutsideBoundsFromOrigin(): boolean {
    return (
      this.isTargetLeftGreaterThanOriginLeft() ||
      this.isTargetTopGreaterThanOriginTop() ||
      this.isTargetRightLessThanOriginRight() ||
      this.isTargetBottomLessThanOriginBottom()
    );
  }

  public getAdjustedTargetLeftPositionFromOrigin() {
    return this.getOriginRight() - this.target.getScaledWidth();
  }

  public getAdjustedTargetTopPositionFromOrigin() {
    return this.getOriginBottom() - this.target.getScaledHeight();
  }

  public isTargetBeyondOriginBounds(): boolean {
    return (
      this.isTargetLeftLessThanOriginLeft() ||
      this.isTargetTopLessThanOriginTop() ||
      this.isTargetRightGreaterThanOriginRight() ||
      this.isTargetRightGreaterThanOriginRight()
    );
  }
}
