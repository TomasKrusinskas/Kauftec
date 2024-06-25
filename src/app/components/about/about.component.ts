import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  footerText: string = '';
  private texts: string[] = ['one step beyond', '@ cyberia 2024'];
  private currentTextIndex: number = 0;
  private intervalId: any;

  @ViewChild('footerTextElement') footerTextElement!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.animateText();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private animateText() {
    const currentText = this.texts[this.currentTextIndex];
    this.typeText(currentText).then(() => {
      setTimeout(() => {
        this.deleteText(currentText).then(() => {
          this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
          this.animateText();
        });
      }, 2000);
    });
  }

  private typeText(text: string): Promise<void> {
    return new Promise((resolve) => {
      let index = 0;
      this.intervalId = setInterval(() => {
        if (index < text.length) {
          this.footerText += text.charAt(index);
          index++;
        } else {
          clearInterval(this.intervalId);
          resolve();
        }
      }, 100);
    });
  }

  private deleteText(text: string): Promise<void> {
    return new Promise((resolve) => {
      let index = text.length;
      this.intervalId = setInterval(() => {
        if (index > 0) {
          this.footerText = this.footerText.substring(0, index - 1);
          index--;
        } else {
          clearInterval(this.intervalId);
          resolve();
        }
      }, 100);
    });
  }
}
