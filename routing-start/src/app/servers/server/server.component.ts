import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    const id = +this.route.snapshot.params['id'] //stringfy the id with +

    this.server = this.serversService.getServer(id);
    this.route.params.subscribe((params:Params)=>{
      this.server = this.serversService.getServer(+params['id']); //stringfy the id with + 
    })
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling:'preserve'});
    //queryParamsHandling: merge => merges our old query params with any new we might add here
    //queryParamsHandling: preserve => overRides a default behaviour, which is simply drop them when click on another button to navigate
    //and makes sure that the old ones are kept
    //if we were to add new ones here the old ones would actually override the new ones
    //so it would be better to use merge in this case
  }
}
