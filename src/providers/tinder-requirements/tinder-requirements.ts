import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

/*
  Generated class for the TinderRequirementsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TinderRequirementsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TinderRequirementsProvider Provider');
  }

  // Observable string sources
  private requirementsSource = new Subject<any>();

 
  // Observable string streams
  requirementsSent$ = this.requirementsSource.asObservable();
 
  // Service message commands
  announceRequirements(requirementsarray: any) {
    this.requirementsSource.next(requirementsarray);

  }

}
