import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-widget-image-holder',
  templateUrl: './image-holder.component.html',
  styleUrls: ['./image-holder.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageHolderComponent {
  @Input() src: string;
  @Input() cssClasses: string;
  @Input() alt: string;
}
