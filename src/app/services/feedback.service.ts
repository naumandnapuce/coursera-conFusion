import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
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
export class FeedbackService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService:processHTTPMsgService) { }
    
    submitFeedback(feedback:Feedback): Observable<Feedback> {
      return this.restangular.all('feedback').post(feedback);
    }

}
