import { Routes } from '@angular/router';
import { StoreEntriesLookupComponent } from './components/store-entries-lookup/store-entries-lookup.component';
import { CustomerRegistrationComponent } from './components/customer-registration/customer-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { DeviceRegistrationComponent} from './components/device-registration/device-registration.component'
import { StoreEntryRegistrationComponent } from './components/store-entry-registration/store-entry-registration.component';
import { TechnicianRegistrationComponent } from './components/technician-registration/technician-registration.component';
import { authGuard } from './shared/guards/auth.guard';
import { StoreEntryListComponent } from './components/store-entry-list/store-entry-list.component';
import { StoreEntryUpdateComponent } from './components/store-entry-update/store-entry-update.component';
import { CustomerListComponent } from './components/customers-list/customers-list.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';
import { DeviceUpdateComponent } from './components/device-update/device-update.component';


export const routes: Routes = [  //routes for links
    
    {path: 'store-entry-lookup', component: StoreEntriesLookupComponent},
    {path: 'store-entry-list', canActivate:[authGuard], component: StoreEntryListComponent},
    { path: 'store-entry-update/:id',canActivate:[authGuard], component: StoreEntryUpdateComponent },
    {path: 'customer-registration', canActivate:[authGuard], component: CustomerRegistrationComponent},
    {path: 'device-registration', canActivate:[authGuard],component: DeviceRegistrationComponent},
    {path: 'user-login', component: UserLoginComponent},
    {path: 'technician-registration', component: TechnicianRegistrationComponent},
    {path: 'store-entry-registration', canActivate:[authGuard],component: StoreEntryRegistrationComponent},
    {path: 'customer-list', canActivate:[authGuard],component: CustomerListComponent},
    {path: 'device-list', canActivate:[authGuard],component: DeviceListComponent},
    {path: 'customer-update/:id', canActivate:[authGuard],component: CustomerUpdateComponent},
    {path: 'device-update/:id', canActivate:[authGuard],component: DeviceUpdateComponent},
];
