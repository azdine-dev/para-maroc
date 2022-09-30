import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'molla-top-collection',
  templateUrl: './top-collection.component.html',
  styleUrls: ['./top-collection.component.scss'],
})
export class TopCollectionComponent implements OnInit {
  @Input() products = [];
  @Input() loaded = false;
  categories = [['all'], ['maquillage '], ['visage'], ['corps'], ['cheveux']];
  titles = {
    all: 'Tous',
    maquillage: 'Maquillage',
    visage: 'Visage',
    corps: 'Corps',
    cheveux: 'Cheveux',
  };
  constructor() {}

  ngOnInit(): void {}
}
