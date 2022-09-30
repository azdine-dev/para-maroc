import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'molla-difussion-menu',
  templateUrl: './difussion-menu.component.html',
  styleUrls: ['./difussion-menu.component.scss']
})
export class DifussionMenuComponent implements OnInit, OnDestroy {

  current = '/';

	private subscr: Subscription;

	constructor(private router: Router) {
		this.subscr = this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				this.current = event.url;
			} else if (event instanceof NavigationEnd) {
				this.current = event.url;
			}
		});
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.subscr.unsubscribe();
	}

}
