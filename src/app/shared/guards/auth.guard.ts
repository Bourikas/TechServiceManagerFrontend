import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  let userService = inject(UserService);
  let routerService = inject(Router)
  if(!userService.isLoggedIn()){
    routerService.navigate(['/user-login'])
    return false;
  }
  return true;
};
