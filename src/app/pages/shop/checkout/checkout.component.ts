import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'shop-checkout-page',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartItems = [];

  private subscr: Subscription;
  checkoutForm: FormGroup;
  submitted = false;

  constructor(
    public cartService: CartService,
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscr = this.cartService.cartStream.subscribe((items) => {
      this.cartItems = items;
    });

    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });

    document
      .querySelector('body')
      .addEventListener('click', () => this.clearOpacity());
  }

  get f() {
    return this.checkoutForm.controls;
  }

  isFieldValid(field: string) {
    // if(field == 'phone'){
    //   const regex = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$');
    //   let value = this.f.phone.value;
    //   let phone = field;
    //   let isTouched = this.checkoutForm.get(field).touched;
    //   let untouched = this.checkoutForm.get(field).untouched;
    //   return ((!regex.test(phone) || phone.length < 9)&& isTouched || (untouched && this.submitted));
    // }
    return (
      (!this.checkoutForm.get(field).valid &&
        this.checkoutForm.get(field).touched) ||
      (this.checkoutForm.get(field).untouched && this.submitted)
    );
  }

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
    document
      .querySelector('body')
      .removeEventListener('click', () => this.clearOpacity());
  }

  clearOpacity() {
    let input: any = document.querySelector('#checkout-discount-input');
    if (input && input.value == '') {
      let label: any = document.querySelector('#checkout-discount-form label');
      label.removeAttribute('style');
    }
  }

  addOpacity(event: any) {
    event.target.parentElement
      .querySelector('label')
      .setAttribute('style', 'opacity: 0');
    event.stopPropagation();
  }

  formToggle(event: any) {
    const parent: HTMLElement = event.target.closest('.custom-control');
    const submenu: HTMLElement = parent
      .closest('.form-group')
      .querySelector('.shipping-info');

    if (parent.classList.contains('open')) {
      $(submenu).slideUp(300, function () {
        parent.classList.remove('open');
      });
    } else {
      $(submenu).slideDown(300, function () {
        parent.classList.add('open');
      });
    }

    event.preventDefault();
    event.stopPropagation();
  }

  sendViaWhatsapp() {
    this.submitted = true;
    if (!this.checkoutForm.valid) {
      return;
    }
    const message = `Bonjour%0a je m'appelle ${this.f.name.value} ${this.f.lastName.value}%0a Je veux confirmer ma commande chez para Difussion: %0a
    `;
    let productMsg = '';
    for (let product of this.cartItems) {
      productMsg +=
        product.name + ': ' + product.sum.toFixed(2) + ' DH' + '%0a';
    }
    let priceTotal = 0;
    this.cartService.priceTotal.subscribe((item) => {
      priceTotal = item;
    });
    let total = 'Total : ' + priceTotal + ' DH';
    const url = `https://api.whatsapp.com/send/?phone=${
      environment.phone
    }&text=${message + productMsg + total}&type=phone_number&app_absent=0`;
    window.open(url, '_blank');
  }
}
