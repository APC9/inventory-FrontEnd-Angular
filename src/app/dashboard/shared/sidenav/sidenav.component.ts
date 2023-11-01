import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { MediaMatcher} from '@angular/cdk/layout';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  mobileQuery!: MediaQueryList;
  menuNav =[
    {name: 'Home', route: 'home', icon: 'home'},
    {name: 'Categories', route: 'category', icon: 'category'},
    {name: 'Products', route: 'product', icon: 'production_quantity_limits'},
  ]

  constructor(mediaMatcher: MediaMatcher) {
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {  }
}
