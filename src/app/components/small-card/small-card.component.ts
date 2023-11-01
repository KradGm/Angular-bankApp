import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css', './small-card.componentresolution.css']
})
export class SmallCardComponent implements OnInit {

  @Input()
  imgCover:string=""

  @Input()
  cardText:string=""
  constructor(private router: Router) {}

  ngOnInit(): void {

  }
}
