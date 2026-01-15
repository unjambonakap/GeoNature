import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

export enum AdvancedSectionState {
  COLLAPSED = 'collapsed',
  EXPANDED = 'expanded',
}

export function uuid4() {
    // from ipython project
    // http://www.ietf.org/rfc/rfc4122.txt
    const s = new Array(32);
    const hex_digits = "0123456789ABCDEF";
    for (let i = 0; i < 32; i++) {
        s[i] = hex_digits[Math.floor(Math.random() * 0x10)];
    }
    s[12] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[16] = hex_digits[(s[16].charCodeAt(0) & 0x3) | 0x8]; // bits 6-7 of the clock_seq_hi_and_reserved to 01
    return s.join("");
}

@Component({
  selector: 'gn-advanced-section',
  templateUrl: 'advanced-section.component.html',
  styleUrls: ['./advanced-section.component.css'],
  animations: [
    trigger('state', [
      state(
        AdvancedSectionState.COLLAPSED,
        style({
          height: '0px',
          minHeight: '0',
          margin: '-1px',
          overflow: 'hidden',
          padding: '0',
          display: 'none',
        })
      ),
      state(AdvancedSectionState.EXPANDED, style({ height: '*' })),
      transition(
        `${AdvancedSectionState.EXPANDED} <=> ${AdvancedSectionState.COLLAPSED}`,
        animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AdvancedSectionComponent implements AfterViewChecked {
  @Input()
  state: AdvancedSectionState = AdvancedSectionState.COLLAPSED;

  hideParent: boolean = false;
  advancedPanelID: string = 'advancedSection-' + uuid4().slice(0, 5);

  ngAfterViewChecked() {
    // Hide the Advanced button if no forms (or anything else) in the advanced section
    this.hideParent = document.getElementById(this.advancedPanelID)?.childElementCount < 1;
  }

  toggleState() {
    this.state =
      this.state === AdvancedSectionState.COLLAPSED
        ? AdvancedSectionState.EXPANDED
        : AdvancedSectionState.COLLAPSED;
  }
}
