import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  currentSlide: number = 1
  dotHelper: Array<Number> = []
  slider: KeenSliderInstance|null = null

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel
        },
      })
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys(),
      ]
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

  slides = [
    {
      class: "bg-roses number-slide bg-no-repeat bg-center",
      text: "Estamos Cultivando Finanzas Una Rosa a la Vez.",
    },
    {
      class: "bg-white-rose number-slide bg-no-repeat bg-center",
      text: "Con la Elegancia y Pureza de La Rosa Mundial, Tus Finanzas a Otro Nivel.",
    },
    {
      class: "bg-red-rose number-slide bg-no-repeat bg-center",
      text: "Vive la Magia y Pasión de la Rosa Roja en Cada Transacción.",
    },
  ]
}
