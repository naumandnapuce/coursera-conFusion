import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import {Http,Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import {baseURL} from '../shared/baseurl';
import {processHTTPMsgService} from './process-httpmsg.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService:processHTTPMsgService) { }
    
    getLeaders(): Observable<Leader[]> {
      return this.restangular.all('leaders').getList();
    }
  
    getLeader(id: number): Observable<Leader> {
      return  this.restangular.one('leaders',id).get();
    }
  
    getFeaturedLeader(): Observable<Leader> {
      return this.restangular.all('leaders').getList({featured: true})
        .map(leader => leader[0]);
    }

}
