import { Component, OnInit,Inject } from '@angular/core';

import{Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import { Comment } from '../shared/comment';

import 'rxjs/add/operator/switchMap';
import { visibility, flyInOut,expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  dish :Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm :FormGroup;
  comment : Comment;
  errMess: string;
  visibility = 'shown';
  formErrors = {
    'author': '',
    'comment': ''
  };


  validationMessages = {
    'author': {
      'required':      'Author is required.',
      'minlength':     'Author must be at least 2 characters long.'
    },
    'comment': {
      'required':      'Comment is required.'
    }
  };

  constructor(private dishservice:DishService,
    private route:ActivatedRoute
  ,private location:Location
,private fb:FormBuilder,
@Inject('BaseURL') private BaseURL) {
  this.createForm();
 }

  ngOnInit() { 
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
    .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
        errmess => { this.dish = null; this.errMess = <any>errmess; });
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }
  
  goBack():void {
    this.location.back();
  }

  createForm(){
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', [Validators.required] ]
    });

    this.commentForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));
  
    this.onValueChanged(); 

  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date=new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishcopy.save()
      .subscribe(dish=> this.dish=dish);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });

  }
}
