import { Component, OnInit, Renderer2 } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { FeedbackService } from 'src/app/services/feedback.service';
 
@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filterByCategory = '';
  filteredRequests: Feedback[] = [...this.feedbacks];
  selectedFeedback: Feedback | null = null;
  selectedUser: User | null = null;
  selectedScheme: WifiScheme | null = null;

  constructor(private service: FeedbackService, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.service.getFeedbacks().subscribe(data => {
      this.feedbacks = data;
      this.filter();
    });
  }
  showProfile(user: User): void { 
    this.selectedUser = user; 
    const modal = document.getElementById('profileModal'); 
    modal.style.display = 'block'; 
    this.renderer.addClass(document.body, 'modal-open'); 
  }

  closeProfileModal(): void { 
    const modal = document.getElementById('profileModal'); 
    modal.style.display = 'none'; 
    this.selectedUser = null;
    this.renderer.removeClass(document.body, 'modal-open'); 
  }

  viewSchemeInfo(wifiScheme: WifiScheme): void { 
    this.selectedScheme = wifiScheme; 
    const modal = document.getElementById('schemeInfoModal'); 
    modal.style.display = 'block'; 
    this.renderer.addClass(document.body, 'modal-open'); 
  }

  closeSchemeInfoModal(): void { 
    const modal = document.getElementById('schemeInfoModal'); 
    modal.style.display = 'none'; 
    this.selectedScheme = null; 
    this.renderer.removeClass(document.body, 'modal-open'); 
  }

  filter(): void { 
    if (this.filterByCategory === 'all') { 
      this.filteredRequests = this.feedbacks; 
    } 
    else { 
      this.filteredRequests = this.feedbacks.filter(feedback => feedback.category === this.filterByCategory); 
    } 
  }

  showSuccessModal(): void {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
  }

  closeModal(): void {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
    this.filteredRequests = [...this.feedbacks];
  }
}
 
 