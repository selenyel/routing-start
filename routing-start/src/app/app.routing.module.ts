import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { Routes, RouterModule } from "@angular/router";

const appRoutes : Routes = [
    {path:'', component: HomeComponent},
    {path:'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent},
    ]},
    {path:'servers', component: ServersComponent, children: [
      {path:':id/edit', component: EditServerComponent},
      {path:':id', component: ServerComponent}
    ]},
    {path:'not-found', component: PageNotFoundComponent},
    {path:'**', redirectTo: '/not-found', pathMatch:'full'},
  ];
  
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

    
}