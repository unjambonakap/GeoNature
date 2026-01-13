import { Injectable } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject, of } from 'rxjs';
import { catchError, map, filter, switchMap, tap } from 'rxjs/operators';
import { OcctaxFormOccurrenceService } from '../occurrence/occurrence.service';


import { OcctaxFormService } from '../occtax-form.service';

@Injectable()
export class OcctaxFormCountingsService {
  public countings: any[];
  public additionalFields: BehaviorSubject<any[]> = new BehaviorSubject([]);

  public taxref: BehaviorSubject<any> = new BehaviorSubject(null);
  public tmp: Observable<any[]>;

  constructor(private occtaxFormService: OcctaxFormService) {
    this.setObservable();
  }

  setObservable() {
    combineLatest(this.occtaxFormService.getGlobalAndAdditionalFields(['OCCTAX_DENOMBREMENT']), this.taxref)
      .pipe(
        tap(([fields, taxref]) => this.occtaxFormService.updateAdditionalFieldsWithTaxref(fields, taxref)),
        map(([fields, taxref]) => fields.slice()),
      )
      .subscribe(this.additionalFields);


  }
}
