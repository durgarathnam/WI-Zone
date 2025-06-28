import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { FeedbackService } from 'src/app/services/feedback.service';


@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  selectedScheme: WifiScheme | null = null;
  feedbackToDelete: number | null = null;

  constructor(private feedbackService:FeedbackService,
    private userStore:UserStoreService) { }

  ngOnInit(): void {
    const userId = this.userStore.authUser.userId;
    this.feedbackService.getAllFeedbacksByUserId(userId).subscribe(data=>this.feedbacks=data);
  }
  
  viewSchemeInfo(wifiScheme:WifiScheme): void {
    console.log('Scheme Info:', wifiScheme);  // Debugging log
    this.selectedScheme = wifiScheme;
    const modal = document.getElementById('schemeInfoModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeSchemeInfoModal(): void {
    const modal = document.getElementById('schemeInfoModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.selectedScheme = null;
  }

  confirmDelete(feedbackId: number): void {
    this.feedbackToDelete = feedbackId;
    const modal = document.getElementById('deleteModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  deleteFeedback(): void {
    if (this.feedbackToDelete !== null) {
      this.feedbackService.deleteFeedback(this.feedbackToDelete)
      .subscribe(()=>{this.feedbacks = this.feedbacks.filter(f => f.feedbackId !== this.feedbackToDelete);
        this.feedbackToDelete = null;
        this.closeDeleteModal();});
    }
  }

  closeDeleteModal(): void {
    const modal = document.getElementById('deleteModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.feedbackToDelete = null;
  }
}


