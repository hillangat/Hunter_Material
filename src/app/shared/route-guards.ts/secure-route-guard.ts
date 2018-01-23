import { CanActivate } from '@angular/router/src/interfaces';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'RXJS';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';


export class SecureRouteGuard implements CanActivate {

    public canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        return true;
    }

}
