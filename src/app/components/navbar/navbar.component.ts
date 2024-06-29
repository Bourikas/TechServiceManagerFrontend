import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userService = inject(UserService);
  user = this.userService.user;
  

  ngOnInit() {
    // Ensure the user information is initialized
    const loggedInUser = this.userService.user();
    if (!loggedInUser && this.userService.isLoggedIn()) {
      const accessToken = this.userService.getAccessToken();
      if (accessToken) {
        this.userService.refreshToken().subscribe(() => {
          this.user.set(this.userService.user());
        });
      }
    } else {
      this.user.set(loggedInUser);
    }
  }

  logout() {
    this.userService.logoutUser();
  }
}
