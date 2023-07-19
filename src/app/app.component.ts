import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Canvas } from 'fabric';
import { Image, fabricServiceInstance, insert } from '@fabric-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class AppComponent {
  private image: Image | null = null;

  ngOnInit() {
    const canvas = new Canvas('canvas', {
      renderOnAddRemove: true,
      enableRetinaScaling: true,
      uniScaleTransform: true,
      preserveObjectStacking: true,
      fireRightClick: true,
      stopContextMenu: true,
      controlsAboveOverlay: true,
      perPixelTargetFind: false,
      backgroundColor: 'transparent',
      stateful: true,
      selectionColor: 'rgba(46, 115, 252, 0.11)',
      selectionBorderColor: 'rgba(98, 155, 255, 0.81)',
      selectionLineWidth: 1.5,
    });

    fabricServiceInstance.setCanvas(canvas);
  }

  ngAfterViewInit() {
    const image = document.createElement('img') as HTMLImageElement;

    image.onload = () => {
      this.image = new Image(image);
      this.image.set({ data: {} });
      this.image.scaleToWidth(300);
      insert(this.image);
    };

    image.src =
      'https://images.unsplash.com/photo-1685659928694-6300f3eb01f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80';
  }

  public applyCrop() {
    this.image?.applyCrop();
  }
}
