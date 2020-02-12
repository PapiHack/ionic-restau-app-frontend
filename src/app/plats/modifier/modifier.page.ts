import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.page.html',
  styleUrls: ['./modifier.page.scss'],
})
export class ModifierPage implements OnInit {
  id: number;
  constructor(private route: ActivatedRoute) {
    this.id = +this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
  }

}
