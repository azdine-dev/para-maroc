import { Component, OnInit, Input } from '@angular/core';

import { specialSlider } from '../data';

@Component({
  selector: 'molla-special-collection',
  templateUrl: './special-collection.component.html',
  styleUrls: ['./special-collection.component.scss'],
})
export class SpecialCollectionComponent implements OnInit {
  @Input() products = [];
  @Input() loaded = false;

  sliderOption = specialSlider;
  attrs = ['featured', 'sale', 'rated'];
  titles = {
    featured: 'Populaires',
    sale: 'En vente',
    rated: 'Les mieux notés',
  };

  constructor() {}

  ngOnInit(): void {}
}
