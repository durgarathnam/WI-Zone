import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WifiSchemeRequest } from 'src/app/models/wifi-scheme-request.model';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';
import { UserStoreService } from 'src/app/helpers/user-store.service';

@Component({
  selector: 'app-userviewappliedrequest',
  templateUrl: './userviewappliedrequest.component.html',
  styleUrls: ['./userviewappliedrequest.component.css']
})
export class UserviewappliedrequestComponent implements OnInit {
  requests: WifiSchemeRequest[] = [];
  searchSchemeName = '';
  filteredRequests: WifiSchemeRequest[] = [];
  selectedRequest: WifiSchemeRequest | null = null;
  showModal = false;
  showDeleteModal = false;
  requestToDelete: number | null = null;

  constructor(
    private wifiSchemeRequestservice: WifiSchemeRequestService,
    private userStore:UserStoreService,
    private router:Router
  ) { }

  ngOnInit(): void {
    const userId = this.userStore.authUser.userId;
    this.wifiSchemeRequestservice.getWiFiSchemeRequestsByUserId(userId).subscribe( 
      (data) => {this.requests = data, 
      this.filteredRequests = this.requests;
      },
      (error) => console.error('Error fetching applied requests:', error)
    );
  }

  search(): void {
    if (this.searchSchemeName === '') {
      this.filteredRequests = this.requests;
    } else {
      this.filteredRequests = this.requests.filter(request =>
        request.wifiScheme.schemeName.toLowerCase().includes(this.searchSchemeName.toLowerCase())
      );
    }
  }

  showMore(request: WifiSchemeRequest): void {
    this.selectedRequest = request;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRequest = null;
  }

  confirmDelete(wifiSchemeRequestId: number): void {
    this.requestToDelete=wifiSchemeRequestId;
    this.showDeleteModal = true;
  }

  deleteRequest(): void {
    if (this.requestToDelete !== null) { 
      this.wifiSchemeRequestservice.deleteWiFiSchemeRequest(this.requestToDelete).subscribe( () =>
      { this.requests = this.requests.filter(f => f.wifiSchemeRequestId !== this.requestToDelete);
      this.filteredRequests = this.requests.filter(request => request.wifiScheme.schemeName.toLowerCase().includes(this.searchSchemeName.toLowerCase()) );
      this.selectedRequest = null;
      this.showDeleteModal = false;
      this.requestToDelete = null; }, 
     error => console.error('Error deleting request:', error) 
     );
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.selectedRequest = null;
  }

  navigateToAddFeedback(wifiSchemeId:number): void {
    this.router.navigate(['/useraddfeedback', wifiSchemeId]);
  }

}
