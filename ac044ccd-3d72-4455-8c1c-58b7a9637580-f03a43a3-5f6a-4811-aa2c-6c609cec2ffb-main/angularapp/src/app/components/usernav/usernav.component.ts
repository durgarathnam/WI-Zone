import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
isLogoutModalOpen = false;
name:string='';
userRole:string='';
  constructor(private userStore:UserStoreService,
    private router: Router,
    private authservice:AuthService) { }

  ngOnInit(): void {
    this.name=this.userStore.authUser.userName;
    this.userRole=this.userStore.authUser.role;
  }

  openLogoutModal(): void {
    this.isLogoutModalOpen = true;
  }

  closeLogoutModal(): void {
    this.isLogoutModalOpen = false;
  }

  confirmLogout(): void {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
