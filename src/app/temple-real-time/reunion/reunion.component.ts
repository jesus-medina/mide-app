import { Places } from './../../domain/places.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.scss'],
})
export class ReunionComponent implements OnInit {

  @Input() places: Places;

  constructor() { }

  ngOnInit() {}

}
