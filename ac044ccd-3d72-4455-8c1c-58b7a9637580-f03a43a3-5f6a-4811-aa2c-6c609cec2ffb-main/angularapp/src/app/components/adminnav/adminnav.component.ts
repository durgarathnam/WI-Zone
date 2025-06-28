import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
name:string='';
userRole:string='';
  constructor(private router:Router,
    private userStore:UserStoreService,
    private authservice:AuthService) { }
  isLogoutModalOpen = false;

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
