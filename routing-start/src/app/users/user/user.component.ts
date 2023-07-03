import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  result = 0;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
      // this is an observable and we just subscribed to it
      // this would help us to catch the changes in name and id when it happens!
  }
  onRouterLinkActive(eve){
    this.result++;
    console.log(eve)
  }

  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }
  // This method is for canceling the subscription after the component is destroyed
  // If we dont do this, then our component would get destroyed but the subscription
  // Would be active
}
