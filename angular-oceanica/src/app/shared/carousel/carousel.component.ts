import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('gallery') scrollContainer!: ElementRef;

  ngAfterViewInit() {
    // Add wheel scroll event listener
    this.scrollContainer.nativeElement.addEventListener("wheel", (evt: WheelEvent) => {
      evt.preventDefault();
      this.scrollContainer.nativeElement.scrollLeft += evt.deltaY;
    });
  }

  scrollLeft() {
    const itemWidth = this.scrollContainer.nativeElement.firstElementChild.offsetWidth;
    this.scrollContainer.nativeElement.scrollLeft -= itemWidth;
  }

  scrollRight() {
    const itemWidth = this.scrollContainer.nativeElement.firstElementChild.offsetWidth;
    this.scrollContainer.nativeElement.scrollLeft += itemWidth;
  }
}
