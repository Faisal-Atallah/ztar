import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Layout } from './layout.types';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  layout: Layout;

  /**
   * Constructor
   * @param {ActivatedRoute}_activatedRoute
   */
  constructor(private _activatedRoute: ActivatedRoute) {}

  /**
   * On Init
   */
  ngOnInit(): void {
    this._updateLayout();
  }

  /**
   * Update Layout
   */
  private _updateLayout(): void {
    // Get the current activated route
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const layoutFromQueryParam = route.snapshot.queryParamMap.get(
      'layout'
    ) as Layout;
    if (layoutFromQueryParam) {
      this.layout = layoutFromQueryParam;
    }

    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      // Check if there is a 'layout' data
      if (
        path.routeConfig &&
        path.routeConfig.data &&
        path.routeConfig.data['layout']
      ) {
        // Set the layout
        this.layout = path.routeConfig.data['layout'];
      }
    });
  }
}
