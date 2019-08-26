import { RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

export class InMemoryDataService {
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const heroes = [
      { id: 11, name: 'Mr. Nice', created_date: '2019-01-01' },
      { id: 12, name: 'Narco', created_date: '2019-01-02' },
      { id: 13, name: 'Bombasto', created_date: '2019-01-03' },
      { id: 14, name: 'Celeritas', created_date: '2019-01-04' },
      { id: 15, name: 'Magneta', created_date: '2019-02-01' },
      { id: 16, name: 'RubberMan', created_date: '2019-03-01' },
      { id: 17, name: 'Dynama', created_date: '2019-05-01' },
      { id: 18, name: 'Dr IQ', created_date: '2019-06-01' },
      { id: 19, name: 'Magma', created_date: '2019-07-01' },
      { id: 20, name: 'Tornado', created_date: '2019-08-01' },
    ];
    return { heroes, hero: heroes };
  }
}
