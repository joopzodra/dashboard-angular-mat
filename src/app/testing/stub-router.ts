import { of } from 'rxjs';

export class StubRouter {
  events = of({})
  
  navigateByUrl() { }

}