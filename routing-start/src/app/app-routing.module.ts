import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-activate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes : Routes = [
    {
        path:'', 
        component: HomeComponent
    },
    {
        path:'users', 
        component: UsersComponent, 
        children: [
            {path: ':id/:name', component: UserComponent},
        ]
    },
    {
        path:'servers', 
        // canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: ServersComponent,
        resolve:{server: ServerResolver}, 
        children: [
            {path:':id/edit', component: EditServerComponent, canDeactivate:[CanDeactivateGuard]},
            {path:':id', component: ServerComponent}
        ]
    },
    {   
        path:'not-found', 
        component: ErrorPageComponent,
        data: {message: 'Page not found!'}
    },
    {
        path:'**', 
        redirectTo: '/not-found', 
        pathMatch:'full'
    },
];
// If we want to protect my route I need to use canActivate
// If we want to protect my childs but not the route itself we need to use canActivateChild
// We could just add canActivate to each child too but it would take so much time and
// concentration to do that since our child count may grow a lot!


@NgModule({
    imports: [
//        RouterModule.forRoot(appRoutes, {useHash:true})
//  converts the routes like this :
//  http://localhost:4200/#/servers
//  we do this because when we want to go /servers but
//  we can't due to real domain's web server trying to find this /server route.
//  when it can't find it, it will return 404. So we add the useHash to add # after the link root
//  this way we can say that only care and change the links before the #
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

    
}