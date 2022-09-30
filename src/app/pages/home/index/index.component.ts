import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/app/shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { introSlider, brandSlider } from '../data';
import { sliderOpt } from 'src/app/shared/data';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'molla-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: "<div class='nav-btn next-slide'></div>",
    prevArrow: "<div class='nav-btn prev-slide'></div>",
    dots: true,
    infinite: false,
  };
  products = [];
  promotions = [];
  posts = [];
  allCategories = [];
  loaded = false;
  introSlider = introSlider;
  brandSlider = brandSlider;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    nav: true,
    navSpeed: 700,
    navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };

  constructor(
    public apiService: ApiService,
    public utilsService: UtilsService,
    private modalService: ModalService
  ) {
    // this.modalService.openNewsletter();

    this.apiService.fetchHomeData().subscribe((result) => {
      this.products = result.products;
      this.posts = result.blogs;
      this.loaded = true;
    });
    this.apiService.getAllCategories().subscribe((result) => {
      this.allCategories = result.categories;
    });

    this.apiService.getAllPromotions().subscribe((items) => {
      this.promotions = items.data;
      console.log(this.promotions, 'promotions');
    });
  }

  ngOnInit(): void {}

  removeSlide() {
    this.allCategories.length = this.allCategories.length - 1;
  }
  getLinkOfPromo(promo: any) {
    let link = {
      url: '',
      hasParams: false,
      params: {
        name: '',
        value: '',
      },
    };
    if (promo.attributes.product?.data) {
      link.url = '/product/' + promo.attributes.product?.data.attributes.slug;
      return link;
    } else if (promo.attributes.product_category?.data) {
      link.url = '/shop/product/3cols';

      link.hasParams = true;
      link.params.name = 'category';
      link.params.value =
        promo.attributes.product_category?.data.attributes.slug;
    } else {
      link.url = '#';
    }
    return link;
  }
}
