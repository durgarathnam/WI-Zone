import { Component, OnInit } from '@angular/core';
import { WifiSchemeRequest } from 'src/app/models/wifi-scheme-request.model';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';

@Component({
  selector: 'app-adminviewappliedrequest',
  templateUrl: './adminviewappliedrequest.component.html',
  styleUrls: ['./adminviewappliedrequest.component.css']
})
export class AdminviewappliedrequestComponent implements OnInit {
  searchTerm = '';
  filterStatus = 'All';
  requests: any[] = [];
  filteredRequests: any[] = [...this.requests];
  showModal = false;
  showImageModal = false;
  selectedRequest: WifiSchemeRequest | null = null;
  selectedProofImage: string = '';

  constructor(private service: WifiSchemeRequestService) {}
  
  ngOnInit(): void {
    this.getAllRequests();
  }
 
  getAllRequests(): void {
    this.service.getAllWiFiSchemeRequests().subscribe(
      (data) => {
        this.requests = data.map((request) => ({
          ...request,
          status: request.status || 'Pending'
        }));
        this.filterRequests();
      },
      (error) => {
        console.error('Error fetching Wi-Fi scheme requests:', error);
      }
    );
  }
 
  filterRequests(): void {
    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredRequests = this.requests.filter((request) => {
      const matchesSearch = request.wifiScheme.schemeName.toLowerCase().includes(searchTerm);
      const matchesStatus = this.filterStatus === 'All' || request.status === this.filterStatus;
      return matchesSearch && matchesStatus;
    });
  }

  approveRequest(wifiSchemeRequestId:number,request: WifiSchemeRequest): void {
    request.status = 'Approved';
    this.service.updateWiFiSchemeRequest(wifiSchemeRequestId,request).subscribe(
      () => {
        this.filterRequests();
      },
      (error) => {
        console.error('Error updating request status:', error);
      }
    );
  }

  rejectRequest(wifiSchemeRequestId:number,request: WifiSchemeRequest): void {
    request.status = 'Rejected';
    this.service.updateWiFiSchemeRequest(wifiSchemeRequestId,request).subscribe(
      () => {
        this.filterRequests();
      },
      (error) => {
        console.error('Error updating request status:', error);
      }
    );
  }
 
  viewDetails(request: any): void {
    this.selectedRequest = request;
    this.selectedProofImage = request.proof; // Add this line to get the proof image
    this.showModal = true;
  }
 
  closeModal(): void {
    this.showModal = false;
    this.selectedRequest = null;
    this.showImageModal = false;
  }
 
 

  showProofImage(): void {
    this.showImageModal = true;
  }

  closeImageModal(): void {
    this.showImageModal = false;
  }
}

