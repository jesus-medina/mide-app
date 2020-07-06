import { Component, OnInit, Input } from '@angular/core';
import { Reunion } from 'src/app/domain/reunion.model';

@Component({
  selector: 'app-there-is-no-reunion',
  templateUrl: './there-is-no-reunion.component.html',
  styleUrls: ['./there-is-no-reunion.component.scss'],
})
export class ThereIsNoReunionComponent implements OnInit {

  @Input() reunions: Reunion[] = [];

  constructor() { }

  ngOnInit() {}

}
