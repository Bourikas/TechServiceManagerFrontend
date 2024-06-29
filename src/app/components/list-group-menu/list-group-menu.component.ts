import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';
//this is the component for the menu
@Component({
  selector: 'app-list-group-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,],
  templateUrl: './list-group-menu.component.html',
  styleUrl: './list-group-menu.component.css'
})
export class ListGroupMenuComponent {
  menu: MenuItem[] = [
    { text: 'Store Entry Lookup', routerLink: 'store-entry-lookup'},
    { text: 'Store Entry List', routerLink: 'store-entry-list'},
    { text: 'Customers List', routerLink: 'customer-list'},
    { text: 'Devices List', routerLink: 'device-list'},
    { text: 'New Customer', routerLink: 'customer-registration'},
    { text: 'New Device', routerLink: 'device-registration'},
    { text: 'New Store Entry', routerLink: 'store-entry-registration'},
    { text: 'New Technician', routerLink: 'technician-registration'},
    { text: 'Login', routerLink: 'user-login' },

  ];
}
